
import {createContext} from "react";

interface ContextProps {
   isDeleting:boolean ;
   changeIsDeleting: (value?:boolean) => void
}

const ContextIsDeleting = createContext<ContextProps| null>(null);

export default ContextIsDeleting;
