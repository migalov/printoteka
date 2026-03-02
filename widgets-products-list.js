document.querySelectorAll(".container-widget").forEach((widget) => {
    let newWidgetProducts = document.querySelector("#widget-catalog-tab-content").content.cloneNode(true);
    let h2 = document.createElement("h2");
    h2.innerHTML = widget.querySelector("h2") ? widget.querySelector("h2").innerHTML : "";
    h2.classList.add("cb-trends");
    widget.querySelectorAll(".widget-products .category-block").forEach((product) => {
      let newProductTemplate = document.querySelector("#product-card").content.cloneNode(true);
      let title = product.querySelector(".category-title").innerText.trim(),
        price = product.querySelector(".price").childNodes[0].nodeValue.trim(),
        date = product.querySelector(".product-min-price-container > div").innerText.replace("Изготовим: ", "").trim(),
        src = product.querySelector(".preview-image").src,
        href = product.querySelector("a").href,
        tag = product.querySelector(".product-tag")?.innerText ? product.querySelector(".product-tag").innerText : "";
      newProductTemplate.querySelector(".cb-product-card__title").innerText = title;
      newProductTemplate.querySelector("img").src = src;
      newProductTemplate.querySelector(".cb-product-card__price").innerText = `${price.replace(".00", "")} ₽`;
      newProductTemplate.querySelector(".cb-product-card__ready-date strong").innerText = date;
      newProductTemplate.querySelector(".cb-product-card").href = href;
      newProductTemplate.querySelector(".cb-product-card__tags span").innerText = tag;
      newWidgetProducts.querySelector(".cb-widget-content-wrap").before(h2);
      newWidgetProducts.querySelector(".cb-widget-content-wrap").append(newProductTemplate);
    });
    widget.after(newWidgetProducts);
  });

  document.querySelectorAll(".catalog-product-top .catalog-link").forEach((tab, index) => {
    let newTabWidgetCatalog = document.querySelector("#widget-catalog-tab").content.cloneNode(true);
    let id = `cat-${tab.getAttribute("data-category")}`,
      name = tab.innerText;
    newTabWidgetCatalog.querySelector("label").setAttribute("for", id);
    newTabWidgetCatalog.querySelector("input").id = id;
    newTabWidgetCatalog.querySelector("span").innerText = name;
    /*if(index == 0) newTabWidgetCatalog.querySelector("input").checked = true;*/
    document.querySelector(".cb-widget-catalog-tabs").append(newTabWidgetCatalog);
  });
  // Получаем ссылки на элементы
  const catalogTabs = document.querySelector(".cb-widget-catalog-tabs");

  //const minimalismLabel = document.querySelector('label[for="cat-53"]');
  //const weddingLabel = document.querySelector('label[for="cat-47"]');
  const loveLabel = document.querySelector('label[for="cat-68"]');

  //minimalismLabel.querySelector("input").checked = true;
  catalogTabs.appendChild(document.querySelector("a#all-collection"));
  
  // Перемещаем элемент "Minimalism" в начало списка
  //catalogTabs.insertBefore(minimalismLabel, catalogTabs.firstChild);
  // Перемещаем элемент "Wedding" сразу после "Minimalism"
  //catalogTabs.insertBefore(weddingLabel, minimalismLabel.nextSibling);
  // Перемещаем элемент "Love" в начало списка
  catalogTabs.insertBefore(loveLabel, catalogTabs.firstChild);
  document.querySelectorAll(".catalog-rows").forEach((catalog) => {
    let newTabWidgetCatalogContent = document.querySelector("#widget-catalog-tab-content").content.cloneNode(true);
    let id = catalog.getAttribute("data-category"),
      nameButton = catalog.querySelector(".catalog_product_show_all_products > a")?.innerText.replace("Посмотреть все - ", "Смотреть все идеи фотокниг «").trim(),
      hrefCollection = catalog.querySelector(".catalog_product_show_all_products > a").href.trim(),
      nameAllProducts = `${nameButton}»`;
    catalog.querySelectorAll(".category-block").forEach((product) => {
      let newTabWidgetCatalogProduct = document.querySelector("#product-card").content.cloneNode(true);
      let title = product.querySelector(".category-title").innerText.trim(),
        price = product.querySelector(".price").childNodes[0].nodeValue.trim(),
        date = product.querySelector(".product-min-price-container > div").innerText.replace("Изготовим: ", "").trim(),
        src = product.querySelector(".category-block-images > img").src,
        hrefProduct = product.querySelector("a").href,
        tag = product.querySelector(".product-tag")?.innerText ? product.querySelector(".product-tag").innerText : "";
      newTabWidgetCatalogProduct.querySelector(".cb-product-card__title").innerText = title;
      newTabWidgetCatalogProduct.querySelector("img").src = src;
      newTabWidgetCatalogProduct.querySelector(".cb-product-card__price").innerText = `${price.replace(".00", "")} ₽`;
      newTabWidgetCatalogProduct.querySelector(".cb-product-card__ready-date strong").innerText = date;
      newTabWidgetCatalogProduct.querySelector("a").href = hrefProduct;
      newTabWidgetCatalogProduct.querySelector(".cb-product-card__tags span").innerText = tag;
      newTabWidgetCatalogContent.querySelector(".cb-widget-content-wrap").append(newTabWidgetCatalogProduct);
    });
    newTabWidgetCatalogContent.querySelector(".cb-widget-content-more").href = hrefCollection;
    newTabWidgetCatalogContent.querySelector(".cb-widget-content-more").innerText = nameAllProducts ? nameAllProducts : "";
    newTabWidgetCatalogContent.querySelector(".cb-widget-content").setAttribute("data-id", `cat-${id}`);
    document.querySelector(".cb-widget-catalog").append(newTabWidgetCatalogContent);
    document.querySelector(".cb-widget-catalog-tabs input").checked = true;
  });

    (function () {
  // Для каждого блока cb-widget-content сортируем карточки по цене (по возрастанию)
  var containers = document.querySelectorAll('.cb-widget-content');
  containers.forEach(function (container) {
    var wrap = container.querySelector('.cb-widget-content-wrap');
    if (!wrap) return;

    // Собираем карточки
    var cards = Array.prototype.slice.call(
      wrap.querySelectorAll('.cb-product-card')
    );
    if (!cards.length) return;

    // Функция получения числовой цены из текста, например "4 050 ₽" → 4050
    function getPrice(card) {
      var priceEl = card.querySelector('.cb-product-card__price');
      if (!priceEl) return Number.POSITIVE_INFINITY;
      var text = priceEl.textContent || '';
      var num = text
        .replace(/\s+/g, '') // убираем пробелы
        .replace(/[^\d]/g, ''); // убираем все, кроме цифр
      var value = parseInt(num, 10);
      return isNaN(value) ? Number.POSITIVE_INFINITY : value;
    }

    cards.sort(function (a, b) {
      return getPrice(a) - getPrice(b);
    });

    // Очищаем контейнер и вставляем карточки в новом порядке
    cards.forEach(function (card) {
      wrap.appendChild(card);
    });
  });
})();