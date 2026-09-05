/* Public browser configuration for the existing Supabase project. */
window.APP_CONFIG = {
  supabaseUrl: "https://nfrfqqzixukjixijjvcg.supabase.co",
  supabaseKey: "sb_publishable_K_nAIVC_GJD5WXPVdprHsg_d2oqPUlk"
};

(() => {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input?.url;

    if (url === "https://ipwho.is/") {
      try {
        const ipv4Response = await originalFetch("https://api.ipify.org?format=json");
        if (ipv4Response.ok) {
          const { ip } = await ipv4Response.clone().json();
          if (ip) {
            return originalFetch(
              `https://ipwho.is/${encodeURIComponent(ip)}`,
              init
            );
          }
        }
      } catch {
        // Continue with the original lookup when IPv4 is unavailable.
      }
    }

    return originalFetch(input, init);
  };
})();
