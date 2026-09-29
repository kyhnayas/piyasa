# Veri Metodolojisi & Hesaplama Prensipleri

Bu doküman, Türkiye Meslek & Ücret Ansiklopedisi platformunun veri işleme, uç değer temizleme, istatistiksel hesaplama ve yayınlama standartlarını belirler.

---

## 1. Temel İlke ve Dil Kuralları

Platformumuzda tüketiciyi yanıltıcı veya hukuken bağlayıcı nitelikteki asılsız iddialara kesinlikle yer verilmez.

### Yasaklanan İfadeler:
- ❌ "Türkiye'nin en doğru maaş sitesi"
- ❌ "Gerçek maaş"
- ❌ "Kesin maaş garantisi"
- ❌ "Alacağınız resmi ücret"

### Zorunlu Standart İfadeler:
- ✅ "Kaynaklandırılmış piyasa verileri"
- ✅ "Verilerden oluşturulan tahmini ücret aralığı"
- ✅ "Gözlemlenen piyasa dağılımı"
- ✅ "Anonim kullanıcı bildirimleri ve pazar araştırması"
- ✅ **Yasal Uyarı Metni:** *"Bu sonuç resmi maaş veya iş teklifi niteliğinde değildir. Mevcut veri setindeki doğrulanmış gözlemlerden oluşturulmuş tahmini piyasa aralığıdır."*

---

## 2. İstatistiksel Hesaplama Motoru

Her meslek ve filtre grubu (şehir, deneyim, seviye) için tek bir ortalama (`mean`) yerine şu metrikler hesaplanır:

1. **Aykırı Değer Filtrelemesi (Tukey IQR Metodu):**
   - $IQR = Q_3 - Q_1$
   - Alt Eşik: $Q_1 - 1.5 \times IQR$
   - Üst Eşik: $Q_3 + 1.5 \times IQR$
   - Bu eşiklerin dışındaki manipülatif bildirimler veya aşırı uç veriler agregasyona dahil edilmez.

2. **Yüzdelik Dilimler:**
   - **$P_{10} / \text{Min}$:** En düşük piyasa girişi / stajyer-asgari sınır.
   - **$P_{25}$:** Alt çeyreklik (sektöre yeni girenler veya küçük ölçekli firmalar).
   - **Medyan ($P_{50}$):** Türkiye'deki en sağlıklı orta değer (aşırı uçlardan etkilenmez).
   - **$P_{75}$:** Üst çeyreklik (kurumsal firmalar, yabancı dil bilenler, yetkin uzmanlar).
   - **$P_{90} / \text{Max}$:** En üst tavan seviye.

3. **Örneklem Yeterliliği:**
   - Örneklem boyutu $N < 5$ ise tekil rakam yerine: *"Veri toplanıyor (yetersiz örneklem)"* uyarısı gösterilir.
   - $5 \le N < 20$ ise Güven Seviyesi **Düşük (Sarı)** gösterilir.
   - $N \ge 20$ ise Güven Seviyesi **Yüksek (Yeşil)** gösterilir.

---

## 3. Enflasyon ve Yıllar Arası Karşılaştırma Adaptörü

- **Nominal Ücret:** İlgili yılda fiilen kaydedilen TL tutarı.
- **Reel / Enflasyona Göre Düzeltilmiş Ücret:** TÜİK resmi TÜFE endeksi referans alınarak bugünün satın alma gücüne normalize edilmiş karşılaştırmalı değer.
- Nominal ve reel değerler hiçbir zaman birbirine karıştırılmaz, grafiklerde iki ayrı çizgi olarak gösterilir.
