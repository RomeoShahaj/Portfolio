
import { useEffect, useState, useCallback } from "react";


export default function useActiveSection (selectionIds: string[], threshold: number = 0.2) { 

  const [active, setActive] = useState(selectionIds[0]);
  
  const [manualOverrideId, setManualOverrideId] = useState<string | null>(null);

  const handleScrollUpdate = useCallback((id: string) => {
   
    if (!manualOverrideId) {
      setActive(id);
    }
  }, [manualOverrideId]);

  useEffect(() => {
    const observers: IntersectionObserver[] =[];

    selectionIds.forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return ;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleScrollUpdate(id); 
          }
        },{
         
          threshold: threshold, 
        }
      );
      observer.observe(target);
      observers.push(observer);
    });
    
    return() => {
      observers.forEach((obs) => obs.disconnect());
    };
    
  }, [selectionIds, threshold, handleScrollUpdate]); 

  return [active, setActive, setManualOverrideId] as const;
}
