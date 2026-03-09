# Craft Of Salem – Launcher Giriş API

Crackli (çevrimdışı) sunucu için giriş, **Mojang/Microsoft yerine** Craft Of Salem sitesi üzerinden doğrulanır. Launcher, giriş bilgilerini `launcher_login.php` uç noktasına gönderir.

## Uç Nokta

**Site dosyası:** `launcher_login.php` (site kökünde)  
**Tam adres:** `https://craftofsalem.com/launcher_login.php`

Launcher tarafında adres şu dosyada tanımlıdır:  
`SalemLauncher/app/assets/js/craftofsalem-auth.js` → `CRAFT_OF_SALEM_LOGIN_URL`

## İstek

- **Yöntem:** `POST`
- **İçerik türü:** `application/json`
- **Gövde:**
  ```json
  {
    "username": "oyuncu_adi",
    "password": "sifre"
  }
  ```

## Yanıt

### Başarılı giriş

- **HTTP:** `200`
- **Gövde:**
  ```json
  {
    "success": true,
    "username": "OyundaGorunecekIsim",
    "uuid": "opsiyonel-uuid"
  }
  ```
  - `username`: Oyunda gösterilecek isim (`Users.game_name` veya `Users.username`).
  - `uuid`: İsteğe bağlı. Veritabanında `Users.uuid` varsa launcher bunu kullanır; yoksa çevrimdışı UUID üretir.

### Hatalı giriş

- **HTTP:** `400` / `401` / `403` / `500`, **veya** gövde:
  ```json
  {
    "success": false,
    "message": "Hata açıklaması"
  }
  ```

## Site tarafı (zaten mevcut)

`launcher_login.php` şunları yapar:

- **connect.php** ile veritabanına bağlanır (`Users`, `Settings`, `BannedUsers`).
- **Settings**: `encryptionMethod` → `0` = SHA256 (site ile aynı `$SHA$salt$hash`), `1` = MD5.
- **Users**: `username` ile kullanıcı bulunur, şifre kontrol edilir.
- **BannedUsers**: `accID`, `categoryID = 1`, `expiryDate > now` → yasaklıysa `403` ve mesaj döner.
- Başarıda: `game_name` varsa o, yoksa `username` döner; isteğe bağlı `uuid` (Users tablosunda varsa).

Bu yapı sitedeki **giris-yap.php** ve **themes/default/helper.php** (`checkSHA256`) ile uyumludur.

## Launcher tarafı

- Giriş başarılı olunca launcher, API'den gelen **uuid** varsa onu kullanır, yoksa **çevrimdışı UUID** üretir (`OfflinePlayer:<username>` MD5).
- Şifre launcherda saklanmaz; yalnızca oturum bilgisi (görünen ad, uuid) yapılandırma dosyasında tutulur.
- Çıkışta yalnızca launcher yapılandırmasından silinir, sunucuya istek gönderilmez.
