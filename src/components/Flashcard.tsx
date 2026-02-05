 import { useState } from "react";
 import type { Flashcard as FlashcardType } from "../data/flashcardsData";
 
 interface FlashcardProps {
   card: FlashcardType;
   onFlip: (id: string) => void;
 }
 
 /**
  * Componente Flashcard - Tarjeta individual con animación de volteo
  * 
  * Responsabilidades:
  * - Mostrar título (frente) y descripción (reverso)
  * - Manejar la animación de volteo
  * - Notificar al padre cuando se voltea
  */
 const Flashcard = ({ card, onFlip }: FlashcardProps) => {
   // Estado local para controlar si la tarjeta está volteada
   const [isFlipped, setIsFlipped] = useState(false);
 
   // Manejador del clic en la tarjeta
   const handleClick = () => {
     if (!isFlipped) {
       // Solo notificamos al padre la primera vez que se voltea
       onFlip(card.id);
     }
     setIsFlipped(!isFlipped);
   };
 
   return (
     <div
       className="flashcard-container cursor-pointer perspective-1000"
       onClick={handleClick}
       role="button"
       tabIndex={0}
       onKeyDown={(e) => e.key === "Enter" && handleClick()}
       aria-label={isFlipped ? "Mostrar pregunta" : "Mostrar respuesta"}
     >
       <div
         className={`flashcard-inner relative w-full h-80 transition-transform duration-500 transform-style-3d ${
           isFlipped ? "rotate-y-180" : ""
         }`}
       >
         {/* Cara frontal - Título */}
         <div className="flashcard-front absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col items-center justify-center shadow-lg">
           <span className="text-xs uppercase tracking-widest text-primary-foreground/70 mb-4">
             Clic para voltear
           </span>
           <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center leading-relaxed">
             {card.title}
           </h2>
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
             <svg
               className="w-6 h-6 text-primary-foreground/50 animate-bounce-soft"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
               />
             </svg>
           </div>
         </div>
 
         {/* Cara trasera - Descripción */}
         <div className="flashcard-back absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-card p-8 flex flex-col items-center justify-center shadow-lg border border-border overflow-auto">
           <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
             Respuesta
           </span>
           {/* 
             whitespace-pre-line respeta los saltos de línea del string
             Esto permite que la descripción tenga múltiples párrafos
           */}
           <p className="text-base md:text-lg text-card-foreground text-center leading-relaxed whitespace-pre-line">
             {card.description}
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default Flashcard;