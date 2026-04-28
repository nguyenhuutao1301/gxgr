import { useState } from "react";

export type Breadcrumb = { name: string; url: string };

export function useBreadcrumbs(initial: Breadcrumb[] = []) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(initial);

  const addBreadcrumb = () => {
    setBreadcrumbs((prev) => [...prev, { name: "", url: "" }]);
  };

  const updateBreadcrumb = (
    index: number,
    field: keyof Breadcrumb,
    value: string
  ) => {
    setBreadcrumbs((prev) =>
      prev.map((breadcrumb, i) =>
        i === index ? { ...breadcrumb, [field]: value } : breadcrumb
      )
    );
  };

  const removeBreadcrumb = (index: number) => {
    setBreadcrumbs((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    updateBreadcrumb,
    removeBreadcrumb,
  };
}
