    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

    const heartCountEl = $("#heartCount");
    const coinCountEl  = $("#coinCount");
    const copyCountEl  = $("#copyCount");
    const historyList  = $("#historyList");
    const clearBtn     = $("#clearHistory");

    
    async function copyToClipboard(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (e) {
        // will try fallback below
      }
      // Fallback: execCommand
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }

    function nowTime() {
      return new Date().toLocaleTimeString();
    }

    document.body.addEventListener("click", async (e) => {
      const heartBtn = e.target.closest(".js-heart");
      const copyBtn  = e.target.closest(".js-copy");
      const callBtn  = e.target.closest(".js-call");

      if (heartBtn) {
        
        heartCountEl.textContent = String(parseInt(heartCountEl.textContent || "0") + 1);
        return;
      }

      if (copyBtn) {
        const card    = copyBtn.closest(".card");
        const hotline = $(".hotline", card)?.textContent?.trim() || "";
        if (!hotline) return;

        const success = await copyToClipboard(hotline);
        
        alert(success ? `Copied ${hotline} to clipboard` : "Copy failed. Please copy manually.");
        if (success) {
          copyCountEl.textContent = String(parseInt(copyCountEl.textContent || "0") + 1);
        }
        return;
      }

      if (callBtn) {
        const card    = callBtn.closest(".card");
        const name    = $(".service-name", card)?.textContent?.trim() || "Service";
        const hotline = $(".hotline", card)?.textContent?.trim() || "";
        let coins     = parseInt(coinCountEl.textContent || "0");

        if (isNaN(coins)) coins = 0;

        if (coins < 20) {
          alert("Not enough coins to make a call!");
          return;
        }

        alert(`Calling ${name} at ${hotline}`);
        coinCountEl.textContent = String(coins - 20);

        // Add to history
        const entry = document.createElement("div");
        entry.className = "flex justify-between items-center bg-[#FAFAFA] p-3 rounded-lg";
        entry.innerHTML = `
          <div>
            <p class="font-semibold">${name}</p>
            <p class="text-gray-500">${hotline}</p>
          </div>
          <p class="text-gray-500">${nowTime()}</p>
        `;
        historyList.prepend(entry);
        return;
      }
    });

    // Clear history
    clearBtn.addEventListener("click", () => {
      historyList.innerHTML = "";
    });

