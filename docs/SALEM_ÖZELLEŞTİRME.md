# Salem Launcher – Craft Of Salem

Bu launcher **Craft Of Salem** sunucusu için yapılandırılmıştır.

## Mevcut ayarlar

- **Sunucu:** Craft Of Salem – `oyna.craftofsalem.com` (port varsayılan 25565)
- **Minecraft sürümü:** 1.21.11
- **Mod yükleyici:** Fabric *(not: Bu launcher şu an yalnızca Forge destekliyor; Fabric için distribution/launcher tarafında ek geliştirme gerekir.)*
- **Web:** https://craftofsalem.com
- **Discord:** https://discord.gg/BeUW3P5fTA
- **Distribution:** GitHub’dan – `https://raw.githubusercontent.com/craftofsalem/SalemLauncher/main/distribution.json`  
  (Dal veya dosya yolu farklıysa `app/assets/js/distromanager.js` içindeki `distroURL` değiştirin.)

## 2. distribution.json içeriği

Sunucunuzda bir `distribution.json` dosyası yayınlayın. Format için:

- **Tam açıklama:** `docs/distro.md`
- **Örnek yapı:** `docs/sample_distribution.json` (sunucu adresi `oyna.craftofsalem.com`, sunucu adı "Craft Of Salem" olacak şekilde düzenleyebilirsiniz)

En azından şunları içermelidir:

- `version` – index sürümü
- `rss` – (isteğe bağlı) haber RSS feed URL’si
- `discord` – (isteğe bağlı) Discord Rich Presence ayarları
- `servers` – sunucu listesi (her biri `id`, `name`, `description`, `address`, `minecraftVersion`, `modules` vb. içerir)

Sunucu adresi: `oyna.craftofsalem.com` (port yazılmazsa launcher **25565** kullanır).  
Hedef Minecraft sürümü: **1.21.11** (`minecraftVersion` alanına `"1.21.11"` yazın).

Her sunucunun `modules` dizisinde mutlaka bir **Forge** modülü (`type: "ForgeHosted"`) olmalı; yoksa "No forge module found!" hatası alırsınız. *(Fabric kullanmak istiyorsanız launcher’a Fabric desteği eklenmesi gerekir; mevcut örnekler Forge içindir.)* Örnek yapı için `docs/sample_distribution.json` ve `docs/distro.md` içindeki ForgeHosted açıklamasına bakın.

## 3. SSL sertifikası

Distribution JSON’ı HTTPS ile sunuyorsanız, sunucunuzdaki SSL sertifikasının süresinin dolmamış olması gerekir. Sertifika süresi dolduysa launcher "certificate has expired" hatası verir.

- **Kalıcı çözüm:** Sunucunuzda kullanılan SSL sertifikasını yenileyin (Let’s Encrypt, cPanel vb.).
- **Geçici (sadece test):** Sertifikayı atlamak için launcher’ı şu ortam değişkeniyle çalıştırın:
  - Windows (PowerShell): `$env:SALEM_LAUNCHER_INSECURE_DISTRO='1'; npm start`
  - Windows (CMD): `set SALEM_LAUNCHER_INSECURE_DISTRO=1 && npm start`
  Bu ayar güvenli değildir; yalnızca geliştirme/test için kullanın.

## 4. Geliştirme modunda yerel distribution kullanma

İnternetten distribution çekmeden test etmek için:

1. `distribution.json` dosyanızı launcher’ın config klasörüne kopyalayın:
   - Windows: `%APPDATA%\salemlauncher\` (veya `userData` path)
   - macOS: `~/Library/Application Support/salemlauncher/`
2. Ayarlar (Settings) üzerinden **Developer Mode**’u açın; launcher bu klasördeki `dev_distribution.json` veya `distribution.json` dosyasını kullanır.

## 5. İsteğe bağlı özelleştirmeler

- **İkon:** `build/icon.png` ve `app/assets/images/` altındaki logoları Craft Of Salem markanızla değiştirebilirsiniz.

Bu ayarlarla launcher Craft Of Salem için hazırdır.
