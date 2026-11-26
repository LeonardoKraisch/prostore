/**
 * Aceita apenas caminhos internos ("/algo"). Bloqueia URLs absolutas
 * e "//dominio", que permitiriam redirecionar o usuário para outro site.
 */
export function safeCallbackUrl(value: string | null | undefined): string {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  return value;
}
