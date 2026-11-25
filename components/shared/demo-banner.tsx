import { Info } from "lucide-react";

/**
 * Aviso fixo de loja demonstrativa (projeto de portfólio).
 * Pagamentos rodam em modo de teste: nenhum pedido é real.
 */
const DemoBanner = () => {
  return (
    <div
      role="note"
      className="w-full bg-amber-400 px-4 py-2 text-center text-xs font-medium text-amber-950 sm:text-sm"
    >
      <Info className="mr-1 inline h-4 w-4 align-text-bottom" aria-hidden />
      Demo store: this is a portfolio project. Orders are not shipped and
      payments run in test mode. Do not enter real card details.
    </div>
  );
};

export default DemoBanner;
