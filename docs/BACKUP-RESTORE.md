# Veritabanı Yedekleme & Geri Yükleme Prosedürleri (docs/BACKUP-RESTORE.md)

Bu doküman, veri kaybını önlemek amacıyla PostgreSQL veritabanının periyodik yedeklenmesi, felaket kurtarma (disaster recovery) ve şema geri alma (rollback) adımlarını içerir.

---

## 1. Manuel Yedek Alma (PostgreSQL Backup)

```bash
# Docker ortamında tam veritabanı yedeği alma (sıkıştırılmış sql formatında)
docker exec -t piyasa_postgres pg_dump -U piyasa_user -d piyasa_db -F c -b -v -f /tmp/piyasa_backup_$(date +%Y%m%d_%H%M%S).dump

# Yedeği yerel ana makineye kopyalama
docker cp piyasa_postgres:/tmp/piyasa_backup_*.dump ./backups/
```

---

## 2. Yedekten Geri Yükleme (Restore)

```bash
# Hedef veritabanına yedeği yükleme
docker exec -i piyasa_postgres pg_restore -U piyasa_user -d piyasa_db -v -c ./backups/piyasa_backup_dosya_adi.dump
```

---

## 3. Migration Yönetimi & Geri Alma (Rollback)

- **Yeni Migration Üretme:**
  ```bash
  npx prisma migrate dev --name <degisiklik_adi>
  ```
- **Son Migration'ı Geri Alma:**
  Prisma doğrudan "down migration" çalıştırmaz; güvenli yöntem tersine bir şema değişikliği yaparak yeni bir düzeltme migration'ı oluşturmaktır:
  ```bash
  # 1. prisma/schema.prisma dosyasındaki değişikliği eski haline getirin
  # 2. Geri alma migration'ı oluşturun
  npx prisma migrate dev --name revert_previous_change
  ```
