
import {createContext} from "react";

interface SubmitedProps {
   submited: boolean;
   changeSubmited: (v?:boolean) => void
}

const ContextSubmited = createContext<SubmitedProps | null>(null);

export default ContextSubmited;
