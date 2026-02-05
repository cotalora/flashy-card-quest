 import { useState, useEffect, useCallback } from "react";
 import { flashcardsData, type Flashcard as FlashcardType } from "../data/flashcardsData";
 import Flashcard from "./Flashcard";
 
 // Clave para almacenar IDs vistos en sessionStorage
 const STORAGE_KEY = "viewedFlashcards";
 
 /**
  * Componente principal de la aplicación de Memofichas
  * 
  * Responsabilidades:
  * - Gestionar el estado de tarjetas vistas (sessionStorage)
  * - Seleccionar tarjetas aleatorias sin repetir
  * - Coordinar la navegación entre tarjetas
  */
 const FlashcardApp = () => {
   // IDs de tarjetas ya vistas en esta sesión
   const [viewedIds, setViewedIds] = useState<string[]>([]);
   // Tarjeta actualmente mostrada
   const [currentCard, setCurrentCard] = useState<FlashcardType | null>(null);
   // Key para forzar re-render del componente Flashcard
   const [cardKey, setCardKey] = useState(0);
 
   /**
    * Efecto inicial: recuperar tarjetas vistas desde sessionStorage
    * Se ejecuta solo al montar el componente
    */
   useEffect(() => {
     const stored = sessionStorage.getItem(STORAGE_KEY);
     if (stored) {
       try {
         const parsed = JSON.parse(stored) as string[];
         setViewedIds(parsed);
       } catch {
         // Si hay error al parsear, reiniciamos
         sessionStorage.removeItem(STORAGE_KEY);
       }
     }
   }, []);
 
   /**
    * Calcula las tarjetas disponibles (no vistas)
    * Usamos un cálculo derivado en lugar de estado adicional
    */
   const availableCards = flashcardsData.filter(
     (card) => !viewedIds.includes(card.id)
   );
 
   /**
    * Selecciona una tarjeta aleatoria de las disponibles
    * Usa useCallback para evitar recrear la función en cada render
    */
   const selectRandomCard = useCallback(() => {
     if (availableCards.length === 0) {
       setCurrentCard(null);
       return;
     }
 
     // Selección aleatoria
     const randomIndex = Math.floor(Math.random() * availableCards.length);
     setCurrentCard(availableCards[randomIndex]);
     // Incrementar key para forzar re-render del Flashcard (resetear flip)
     setCardKey((prev) => prev + 1);
   }, [availableCards]);
 
   /**
    * Efecto para seleccionar la primera tarjeta
    * Se ejecuta después de cargar viewedIds desde storage
    */
   useEffect(() => {
     if (currentCard === null && availableCards.length > 0) {
       selectRandomCard();
     }
   }, [viewedIds]); // Solo depende de viewedIds para la carga inicial
 
   /**
    * Marca una tarjeta como vista
    * - Actualiza el estado local
    * - Persiste en sessionStorage
    */
   const handleCardFlip = (id: string) => {
     if (!viewedIds.includes(id)) {
       const newViewedIds = [...viewedIds, id];
       setViewedIds(newViewedIds);
       // Persistir en sessionStorage
       sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newViewedIds));
     }
   };
 
   /**
    * Avanza a la siguiente tarjeta aleatoria
    */
   const handleNext = () => {
     selectRandomCard();
   };
 
   /**
    * Reinicia la sesión (borra tarjetas vistas)
    */
   const handleReset = () => {
     sessionStorage.removeItem(STORAGE_KEY);
     setViewedIds([]);
     setCurrentCard(null);
     // El efecto de selección se encargará de mostrar una nueva tarjeta
   };
 
   // Cálculo del progreso
   const totalCards = flashcardsData.length;
   const viewedCount = viewedIds.length;
   const progressPercent = (viewedCount / totalCards) * 100;
 
   return (
     <div className="min-h-screen bg-background flex flex-col">
       {/* Header */}
       <header className="py-6 px-4 border-b border-border">
         <div className="max-w-2xl mx-auto flex items-center justify-between">
           <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
             <svg
               className="w-8 h-8 text-primary"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
               />
             </svg>
             Memofichas
           </h1>
           <span className="text-sm text-muted-foreground">
             {viewedCount} / {totalCards} vistas
           </span>
         </div>
       </header>
 
       {/* Barra de progreso */}
       <div className="w-full bg-muted h-1">
         <div
           className="bg-primary h-1 transition-all duration-500 ease-out"
           style={{ width: `${progressPercent}%` }}
         />
       </div>
 
       {/* Contenido principal */}
       <main className="flex-1 flex flex-col items-center justify-center p-6">
         {currentCard ? (
           // Mostrar tarjeta actual
           <div className="w-full max-w-md animate-scale-in" key={cardKey}>
             <Flashcard card={currentCard} onFlip={handleCardFlip} />
 
             {/* Botón siguiente */}
             <div className="mt-8 flex justify-center">
                {availableCards.length > 0 ? (
                 <button
                   onClick={handleNext}
                   className="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 shadow-sm"
                 >
                   Siguiente
                   <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M13 7l5 5m0 0l-5 5m5-5H6"
                     />
                   </svg>
                 </button>
               ) : (
                  // Última tarjeta - mostrar mensaje
                  viewedCount === totalCards && (
                   <p className="text-muted-foreground text-center animate-fade-in">
                     ¡Esta es la última tarjeta!
                   </p>
                 )
               )}
             </div>
           </div>
         ) : (
           // Todas las tarjetas han sido vistas
           <div className="text-center animate-fade-in max-w-md">
             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
               <svg
                 className="w-10 h-10 text-success"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                 />
               </svg>
             </div>
             <h2 className="text-2xl font-bold text-foreground mb-3">
               ¡Felicidades!
             </h2>
             <p className="text-muted-foreground mb-8">
               Has revisado todas las {totalCards} memofichas de esta sesión.
               <br />
               ¿Quieres repasar de nuevo?
             </p>
             <button
               onClick={handleReset}
               className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md"
             >
               Reiniciar sesión
             </button>
           </div>
         )}
       </main>
 
       {/* Footer */}
       <footer className="py-4 px-4 border-t border-border">
         <p className="text-center text-sm text-muted-foreground">
           Haz clic en la tarjeta para ver la respuesta
         </p>
       </footer>
     </div>
   );
 };
 
 export default FlashcardApp;