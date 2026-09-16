import { usePageBackground } from "@utils/background.ts";


type ApiEndpointParam = {
  name: string;
  description: string;
  example?: string;
};

type ApiEndpointCard = {
  path: string;
  title: string;
  description: string;
  params: ApiEndpointParam[];
  example: string;
};

type ApiEndpointNotePaperProps = {
  card: ApiEndpointCard;
  tableHeaders: {
    param: string;
    description: string;
  };
  exampleLabel: string;
  openInNewTab: string;
};


export default function ApiEndpointNotePaper(
  { card, tableHeaders, exampleLabel, openInNewTab }: ApiEndpointNotePaperProps,
) {

  // Background pour la page de la documentation des API
  usePageBackground("api");


  return (
    <div class="relative mx-auto mb-12 max-w-2xl">
      <div class="paper paper-shadow absolute inset-0">
        <div class="tape-section"></div>
        <div class="tape-section"></div>
      </div>

      <div class="relative z-10 flex flex-col w-full p-4 md:p-6 space-y-4 text-sm md:text-base">
        <div>
          <h2 class="text-lg md:text-xl font-semibold">{card.title}</h2>
          <code class="text-xs md:text-sm text-gray-500">
            GET {card.path}
          </code>
        </div>

        <p class="leading-relaxed">{card.description}</p>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs md:text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-1 pr-4 font-medium">{tableHeaders.param}</th>
                <th class="py-1 font-medium">{tableHeaders.description}</th>
              </tr>
            </thead>
            <tbody>
              {card.params.map((param) => (
                <tr key={param.name} class="border-b border-gray-100">
                  <td class="py-1 pr-4 font-mono whitespace-nowrap">
                    {param.name}
                  </td>
                  <td class="py-1">
                    {param.description}
                    {param.example && (
                      <span class="text-gray-400">
                        {" "}({exampleLabel} {param.example})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="flex items-start gap-2">
          <pre class="flex-1 rounded-lg bg-gray-900 text-gray-100 text-xs md:text-sm p-3 overflow-x-auto custom-scrollbar">
          <code>{card.example}</code>
          </pre>

          <a
            href={card.example}
            target="_blank"
            rel="noopener"
            title={openInNewTab}
            aria-label={openInNewTab}
            class="flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-900 text-gray-100 hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 p-2 w-9 h-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="w-4 h-4"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
