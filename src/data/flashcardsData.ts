 /**
  * Array de memofichas con información de ejemplo
  * Cada objeto contiene: id único, título y descripción (puede tener múltiples párrafos)
  */
 
 export interface Flashcard {
   id: string;
   title: string;
   description: string;
 }
 
 export const flashcardsData: Flashcard[] = [
   {
     id: "fc-001",
     title: "¿Qué es React?",
     description: `React es una biblioteca de JavaScript para construir interfaces de usuario.
 
 Fue desarrollada por Facebook y se basa en el concepto de componentes reutilizables.
 
 Utiliza un Virtual DOM para optimizar el rendimiento de las actualizaciones en la interfaz.`
   },
   {
     id: "fc-002",
     title: "useState Hook",
     description: `useState es un Hook que permite agregar estado a componentes funcionales.
 
 Sintaxis: const [state, setState] = useState(valorInicial);
 
 Retorna un array con dos elementos: el valor actual del estado y una función para actualizarlo.`
   },
   {
     id: "fc-003",
     title: "useEffect Hook",
     description: `useEffect permite ejecutar efectos secundarios en componentes funcionales.
 
 Se ejecuta después de cada renderizado por defecto.
 
 El array de dependencias controla cuándo se vuelve a ejecutar el efecto. Un array vacío [] significa que solo se ejecuta al montar el componente.`
   },
   {
     id: "fc-004",
     title: "Props en React",
     description: `Props (propiedades) son la forma de pasar datos de un componente padre a uno hijo.
 
 Son de solo lectura: un componente nunca debe modificar sus propias props.
 
 Permiten hacer los componentes reutilizables y dinámicos.`
   },
   {
     id: "fc-005",
     title: "Componentes Funcionales",
     description: `Los componentes funcionales son funciones de JavaScript que retornan JSX.
 
 Son más simples y fáciles de leer que los componentes de clase.
 
 Con la introducción de Hooks, pueden manejar estado y ciclo de vida completo.`
   },
   {
     id: "fc-006",
     title: "JSX",
     description: `JSX es una extensión de sintaxis para JavaScript que permite escribir HTML dentro de JS.
 
 No es HTML puro: usa className en lugar de class, y las expresiones JS van entre llaves {}.
 
 Babel transpila JSX a llamadas React.createElement() antes de ejecutarse en el navegador.`
   },
   {
     id: "fc-007",
     title: "Virtual DOM",
     description: `El Virtual DOM es una representación ligera del DOM real en memoria.
 
 React compara el Virtual DOM anterior con el nuevo (diffing) para encontrar cambios.
 
 Solo actualiza las partes del DOM real que cambiaron, mejorando el rendimiento significativamente.`
   },
   {
     id: "fc-008",
     title: "Renderizado Condicional",
     description: `React permite renderizar componentes condicionalmente usando operadores de JavaScript.
 
 Puedes usar: operador ternario (? :), operador AND (&&), o declaraciones if/else.
 
 Ejemplo: {isLoggedIn ? <Dashboard /> : <Login />}`
   }
 ];