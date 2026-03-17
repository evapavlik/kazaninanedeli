"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DebouncedTextarea from "@/components/pruvodce/DebouncedTextarea";

interface Role {
  id: string;
  character: string;
  contemporary: string;
}

interface RoleMap {
  roles: Role[];
  selfReflection: string;
}

const emptyRoleMap: RoleMap = { roles: [], selfReflection: "" };

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function RoleIdentifier({ slug }: { slug: string }) {
  const [saved, setSaved] = useLocalStorage<RoleMap>(
    `kazani-roles-${slug}`,
    emptyRoleMap
  );
  const [data, setData] = useState<RoleMap>(emptyRoleMap);
  const [newCharacter, setNewCharacter] = useState("");

  useEffect(() => {
    setData(saved);
  }, [saved]);

  const persist = useCallback(
    (updated: RoleMap) => {
      setData(updated);
      setSaved(updated);
    },
    [setSaved]
  );

  const addRole = () => {
    const name = newCharacter.trim();
    if (!name) return;
    const updated = {
      ...data,
      roles: [...data.roles, { id: generateId(), character: name, contemporary: "" }],
    };
    persist(updated);
    setNewCharacter("");
  };

  const removeRole = (id: string) => {
    persist({ ...data, roles: data.roles.filter((r) => r.id !== id) });
  };

  const updateContemporary = (id: string, value: string) => {
    const updated = {
      ...data,
      roles: data.roles.map((r) => (r.id === id ? { ...r, contemporary: value } : r)),
    };
    persist(updated);
  };

  const updateSelfReflection = (value: string) => {
    persist({ ...data, selfReflection: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-text-muted">
        {`Identifikujte postavy a role v textu a zamy\u0161lejte se, kdo je to dnes.`}
      </p>

      {/* Add role */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newCharacter}
          onChange={(e) => setNewCharacter(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addRole()}
          placeholder={`Jm\u00E9no postavy (nap\u0159. Samarit\u00E1n, farizeus\u2026)`}
          className="flex-1 rounded-lg border border-border/70 bg-white/80 px-3 py-2 text-sm text-text placeholder:text-text-light/50 focus:border-brick/30 focus:outline-none focus:ring-2 focus:ring-brick/10"
        />
        <button
          onClick={addRole}
          disabled={!newCharacter.trim()}
          className="shrink-0 rounded-lg bg-brick px-4 py-2 text-sm font-medium text-white transition-all hover:bg-brick-light disabled:opacity-40"
        >
          {`P\u0159idat`}
        </button>
      </div>

      {/* Role cards */}
      {data.roles.map((role) => (
        <div
          key={role.id}
          className="rounded-lg border border-border/50 bg-white/60 p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-lora text-sm font-semibold text-text">
              {role.character}
            </span>
            <button
              onClick={() => removeRole(role.id)}
              className="text-xs text-text-light hover:text-brick"
              title="Odebrat"
            >
              {"\u2715"}
            </button>
          </div>
          <DebouncedTextarea
            value={role.contemporary}
            onChange={(val) => updateContemporary(role.id, val)}
            placeholder={`Kdo je ${role.character} dnes? V jak\u00E9 situaci se nach\u00E1z\u00ED?`}
            rows={2}
            variant="brick"
          />
        </div>
      ))}

      {data.roles.length === 0 && (
        <p className="py-2 text-center text-xs italic text-text-light">
          {`Zat\u00EDm \u017E\u00E1dn\u00E9 role. P\u0159idejte postavu z textu.`}
        </p>
      )}

      {/* Self-reflection */}
      <div className="border-t border-border/30 pt-4">
        <DebouncedTextarea
          label={`Kde jsem j\u00E1 v tomto p\u0159\u00EDb\u011Bhu?`}
          value={data.selfReflection}
          onChange={updateSelfReflection}
          placeholder={`S kter\u00FDmi postavami se identifikuji? Pro\u010D?`}
          rows={3}
          variant="sage"
        />
      </div>
    </div>
  );
}
