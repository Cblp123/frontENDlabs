emailjs.init("y_CeZhU-BCysptz7h");

const ticketPrices = {
    concert1: 2000,
    concert2: 1500,
    concert3: 1000,
    concert4: 2500,
    concert5: 500
};
const ticketDates = {
    concert1: '3 июня',
    concert2: '30 июня',
    concert3: '2 июля',
    concert4: '15 июля',
    concert5: '27 июля'
};

const preSelectedSeatsByConcert = {
    concert1: new Set(['1-2', '2-5', '3-4', '3-5', '3-6', '5-2', '5-3']),
    concert2: new Set(['1-1', '2-3', '3-7', '1-1', '1-2', '1-3']),
    concert3: new Set(['1-5', '2-2', '3-6', '4-7', '4-6']),
    concert4: new Set(['1-3', '2-4', '3-8', '1-1', '1-2', '2-3']),
    concert5: new Set(['1-4', '2-6', '3-2', '3-3', '3-4'])
};

const manuallySelectedSeats = new Set();

function openModal() {
    document.getElementById('overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
}

function resetSelection() {
    manuallySelectedSeats.clear();
    updateSelectedSeatsDisplay('');
}

function showHall() {
    const concertName = document.getElementById('concert').value;
    const hall = document.getElementById('hall');
    const seatsDisplay = document.getElementById('selected-seats');

    if (!concertName) {
        hall.style.display = 'none';
        seatsDisplay.innerText = 'Выбранные места: нет';
        updateTotalPrice(0);
        return;
    }

    const preSelectedSeats = preSelectedSeatsByConcert[concertName] || new Set();

    hall.style.display = 'grid';
    hall.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 8; j++) {
            const seatId = `${i}-${j}`;
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.innerText = seatId;

            if (preSelectedSeats.has(seatId)) {
                seat.classList.add('preselected');
            } else {
                seat.onclick = () => {
                    console.log(seat.classList);
                    seat.classList.toggle('selected') ? manuallySelectedSeats.add(seatId) : manuallySelectedSeats.delete(seatId);
                    updateSelectedSeatsDisplay(concertName);
                };
            }
            hall.appendChild(seat);
        }
    }

    updateSelectedSeatsDisplay(concertName);
}

function updateSelectedSeatsDisplay(concertName) {
    const seatsDisplay = document.getElementById('selected-seats'); 
    const seats = Array.from(manuallySelectedSeats).map(seat => `${seat.replace('-', ' ряд, ')} место`);
    seatsDisplay.innerHTML = seats.length ? `Выбранные места: <br>${seats.join('<br>')}` : 'Выбранные места: нет';
    console.log(concertName, ticketPrices[concertName]);
    updateTotalPrice(seats.length * ticketPrices[concertName]);
}

function updateTotalPrice(price) {
    document.getElementById('total-price').innerText = `Общая цена: ${price}₽`;
}

function sendTickets() {
    const email = document.getElementById('email').value;
    const concert = document.getElementById('concert').value;

    // Get the concert name from the dropdown
    const nameConcert = document.getElementById('concert').options[document.getElementById('concert').selectedIndex].text;

    if (nameConcert) {
        console.log("Название концерта:", nameConcert);
    } else {
        console.error("Элемент найден, но текста в нём нет.");
        return;
    }

    const seats = Array.from(manuallySelectedSeats).map(seat => `${seat.replace('-', ' ряд и ')} место`);

    const totalPrice = document.getElementById('total-price').innerText;

    if (!email || !concert || !seats.length) {
        alert('Заполните все поля и выберите места!');
        return;
    }

    emailjs.send("service_8j6k4e9", "template_ps1qn5e", {
        message: `Билеты на ${nameConcert}. Места: ${seats}. ${totalPrice} \nДата концерта: ${ticketDates[concert]}`,
        reply_to: email
    }).then(() => {
        alert("Письмо успешно отправлено!");
    }, (error) => {
        alert("Ошибка при отправке письма: " + error.text);
    });
}
