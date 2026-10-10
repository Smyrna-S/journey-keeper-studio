<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## AUTREL architecture
- Keep original destination IDs, badges, equipment, reward formulas and browser-storage keys in src/autrel; compatibility preserves imported journey data and game rules.
- Implement content pages with TanStack file routes and a shared journal shell; navigation stays native to the host framework.
- Load original Firebase auth/sync and browser-only tools after hydration; published SSR must not import browser-only services.
- Retain original postcard and gear modules until their redesign is separately verified; preserving existing interactions takes precedence over replacing working tools.
- Use semantic CSS tokens and journal button variants for new presentation; original modules remain isolated during incremental redesign.
