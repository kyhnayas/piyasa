# Sorun Giderme Rehberi (docs/TROUBLESHOOTING.md)

Bu doküman, geliştirme ve canlı ortamlarda karşılaşılabilecek yaygın teknik hataları ve çözüm yollarını listeler.

---

## 1. Docker Servisi Başlatılamıyor
- **Belirti:** `failed to connect to the docker API at npipe...`
- **Neden:** Docker Desktop uygulaması veya Windows servisi (`com.docker.service`) kapalı.
- **Çözüm:** Windows Başlat menüsünden `Docker Desktop` uygulamasını çalıştırın veya PowerShell'de yönetici olarak:
  ```powershell
  Start-Service -Name com.docker.service
  ```

---

## 2. Port Çakışmaları
- **Belirti:** `Error: listen EADDRINUSE: address already in use :::3000`
- **Çözüm:** Portu dinleyen süreci tespit edin ve kapatın:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
  Stop-Process -Id <PID>
  ```

---

## 3. Ghost CMS Windows Native Modül Sorunları
- **Belirti:** `ghost-cli` doğrudan Windows Node 22 üzerinde `sharp` veya `sqlite3` derleme hatası verir.
- **Çözüm:** Ghost'u yerel Node ortamında derlemek yerine projedeki `docker-compose.yml` (`ghost:5-alpine`) üzerinden çalıştırın. Bu, işletim sisteminden bağımsız %100 kararlı çalışma sağlar.

---

## 4. Prisma Client Senkronizasyon Hatası
- **Belirti:** `PrismaClientInitializationError: Query engine not found`
- **Çözüm:**
  ```bash
  npx prisma generate
  ```
