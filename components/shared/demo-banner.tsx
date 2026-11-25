/**
 * Aviso fixo de loja demonstrativa (projeto de portfólio).
 * Pagamentos rodam em modo de teste: nenhum pedido é real.
 */
const DemoBanner = () => {
  return (
    <div
      role="note"
      className="w-full border-b bg-secondary px-4 py-2 text-center text-xs text-secondary-foreground sm:text-sm"
    >
      <span
        className="mr-2 inline-block size-1.5 rounded-full bg-thread align-middle"
        aria-hidden
      />
      Demo store: orders are not shipped and payments run in test mode. Do
      not enter real card details.
    </div>
  );
};

export default DemoBanner;
