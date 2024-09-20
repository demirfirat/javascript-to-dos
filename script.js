// DOM elemanlarını seçme
let addButton = document.querySelector('#addBtn'); // Ekleme butonunu seçiyoruz.
let inputText = document.querySelector('#addText'); // Girdi alanını seçiyoruz.
let mylist = document.querySelector('#myList'); // Listeyi seçiyoruz.
let allListitem = document.querySelectorAll('.list-group-item'); // Liste öğelerini seçiyoruz.

// Toast bildirimleri için gerekli DOM elemanlarını seçme
let toastTitles = document.querySelector('#toastTitle'); // Toast başlıkları
let toastMessages = document.querySelector('#toastMessage'); // Toast mesajları
let toastBgDom = document.querySelector('#toast-Bg'); // Toast arka planı
const toastLiveExample = document.getElementById('liveToast');

// Toast bildirim fonksiyonu
function toastFunction(toastTitle, toastMessage, toastBg) {
  const toast = new bootstrap.Toast(toastLiveExample);
  toastTitles.innerHTML = toastTitle;
  toastMessages.innerHTML = toastMessage;
  toastBgDom.className = toastBg;
  toast.show();
}

// localStorage'da tutulacak yapılacaklar listesi
let tasklist = [];

// Önceden eklenmiş liste öğelerine silme ve çizme işlevi ekleme
allListitem.forEach(closeCall);

function closeCall(liItem) {
  let deleteDiv = document.createElement('div');
  let deleteBtn = document.createElement('i');
  deleteDiv.appendChild(deleteBtn);
  deleteBtn.className = 'fa-solid fa-xmark'; // FontAwesome ikonu kullanımı

  // Liste öğesinin üzerini çizmek için tıklama işlemi
  liItem.addEventListener('click', () => {
    liItem.classList.toggle('checked'); // Tıklayınca "checked" sınıfını ekleyip çıkarıyoruz.
  });

  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Silme butonuna tıklanınca liste öğesinin tıklanmasını engelliyoruz.
    let index = Array.from(liItem.parentNode.children).indexOf(liItem); // Silinecek öğenin indeksini alıyoruz
    deleteDiv.parentElement.remove(); // DOM'dan öğeyi kaldırıyoruz.
    
    tasklist.splice(index, 1); // localStorage'dan da kaldırıyoruz.
    localStorage.setItem("tasklist", JSON.stringify(tasklist)); // Güncellenmiş listeyi kaydediyoruz.
    toastFunction("Tebrikler!", "Listeden kaldırıldı", "bg-primary");
  });
  liItem.appendChild(deleteDiv);
}

// Yeni liste elemanı ekleme ve boş girdi kontrolü
addButton.addEventListener('click', addItem);

function addItem(event) {
  if (inputText.value.trim() !== '') { // Boş değer kontrolü
    let listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = inputText.value;
    mylist.appendChild(listItem); // Yeni öğeyi listeye ekliyoruz.
    
    tasklist.push(inputText.value); // localStorage için yeni öğeyi listeye ekliyoruz.
    closeCall(listItem); // Yeni öğeye silme ve çizme fonksiyonunu ekliyoruz.
    
    inputText.value = ''; // Girdi alanını temizliyoruz.
    localStorage.setItem("tasklist", JSON.stringify(tasklist)); // localStorage'a kaydediyoruz.
    
    toastFunction("İşte bu!", "Listeye eklendi", "bg-success");
  } else {
    inputText.value = ''; // Boş girdi durumunda alanı temizle
    toastFunction("Hata", "Bir şeyler yazman gerek!", "bg-danger");
  }
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engelliyoruz.
}

// localStorage'dan listeyi ekrana yükleme
function displayTask() {
  for (let task of tasklist) {
    let listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = task;
    mylist.appendChild(listItem);
    closeCall(listItem); // Her öğeye silme ve çizme fonksiyonunu ekliyoruz.
  }
}

// localStorage'dan kaydedilen veriyi alma
let saved = localStorage.getItem("tasklist");
if (saved) {
  tasklist = JSON.parse(saved);
  displayTask(tasklist); // Kayıtlı görevleri ekrana getiriyoruz.
}