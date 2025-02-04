import "./_components.js";

import { burger } from "./functions/burger.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item"); // Все позиции
  const totalPriceElement = document.getElementById("total-price"); // Итоговая цена
  const nextButton = document.querySelector(".calculator__btn"); // Кнопка "Далее"
  const orderForm = document.getElementById("orderForm");
  const totalInput = document.querySelector("#totalPriceInput");
  // Функция обновления общей цены
  function updateTotalPrice() {
    let total = 0;

    // Проходим по всем строкам (позициям)
    menuItems.forEach((item) => {
      const price = parseInt(item.dataset.price); // Цена из data-price
      const quantity = parseInt(item.querySelector(".quantity").value); // Количество
      total += price * quantity; // Считаем итог
    });
    totalInput.value = total;
    // Отображаем итоговую цену
    totalPriceElement.textContent = `Общая цена: ${total} ₽`;
  }

  // Логика обработки событий кнопок плюс/минус
  menuItems.forEach((item) => {
    console.log(item);
    const minusButton = item.querySelector(".minus"); // Кнопка уменьшения
    const plusButton = item.querySelector(".plus"); // Кнопка увеличения
    const quantityInput = item.querySelector(".quantity"); // Поле ввода количества

    // Обработка кнопки "-"
    minusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value); // Текущее значение
      if (quantity > 0) {
        quantityInput.value = quantity - 1; // Уменьшаем на 1
        updateHiddenInput(item, quantityInput.value);
        updateTotalPrice(); // Обновляем итог
      }
    });

    // Обработка кнопки "+"
    plusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value); // Текущее значение
      quantityInput.value = quantity + 1; // Увеличиваем на 1
      updateHiddenInput(item, quantityInput.value);
      updateTotalPrice(); // Обновляем итог
    });

    // Отслеживание ввода значения вручную
    quantityInput.addEventListener("input", () => {
      if (quantityInput.value < 0) quantityInput.value = 0; // Обнуляем при отрицательном

      updateTotalPrice(); // Обновляем итог
    });
  });

  // Событие на кнопку "Далее"
  nextButton.addEventListener("click", () => {
    const totalPrice = totalPriceElement.textContent;
    alert(totalPrice); // Выводим итог (можно заменить на другое действие)
  });

  function updateHiddenInput(row, quantity) {
    const dishName = row.querySelector("td").textContent; // Название блюда
    let hiddenInput = orderForm.querySelector(
      `input[name="dishes[]"][data-dish-name="${dishName}"]`
    );

    if (!hiddenInput && quantity > 0) {
      // Создание нового скрытого инпута, если его еще нет
      hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = dishName;
      hiddenInput.value = `${dishName}:${quantity}`;
      orderForm.appendChild(hiddenInput);
    } else if (hiddenInput) {
      // Обновление значения уже существующего инпута
      if (quantity > 0) {
        hiddenInput.value = `${dishName}:${quantity}`;
      } else {
        // Удаление инпута, если количество равно 0
        orderForm.removeChild(hiddenInput);
      }
    }
  }
});
