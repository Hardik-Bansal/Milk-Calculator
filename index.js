const date = new Date(); //date object for calendar

const milkData = localStorage.getItem("dataOfMilk")
	? JSON.parse(localStorage.getItem("dataOfMilk"))
	: 	{
			Jan: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Feb: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Mar: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Apr: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			May: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Jun: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Jul: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Jan: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Aug: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Sep: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Oct: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Nov: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			},
			Dec: {
				cow: [],
				buffalo: [],
				mixMilk: [],
				total: 0
			}
		};

//Delete order Item from order list
function deleteOrderItem(event){
	event.preventDefault();
	event.target.parentElement.remove();
}

//Select the present date and display in fill data
function fillDateData(event){
	const pElement = $($(event.target).prevAll()[1]).children()[1];
	const i = $(pElement).text();
	$("#current-selected-date").text(new Date(date.getFullYear(), date.getMonth(), i).toDateString());
}

//Add Order item in the order list
function addItem(event){
	event.preventDefault();
	const orderName = document.getElementById("order-name").value;
	const orderQuantity = document.getElementById("order-quantity").value;
	$("#order-form ul").append(`<li>${orderName} : ${orderQuantity}Kg <button onclick="deleteOrderItem(event)">Delete</button></li>`);
}

//Add Total quantity of 1 day milk at selected date in calendar 
function addData(){
	const cowMilk = parseFloat($("#cow").val());
	const buffaloMilk = parseFloat($("#buffalo").val());
	const mixMilk = parseFloat($("#mix-milk").val());
	const oneDayTotalMilk = cowMilk + buffaloMilk + mixMilk;
	const currentDate = parseInt(($("#current-selected-date").text()).split(" ")[2]);
	$(`.date${currentDate}>p`).text(`Total:${(oneDayTotalMilk).toFixed(2)}`);
	milkData[($("#current-selected-date").text()).split(" ")[1]].cow[currentDate-1] = cowMilk;
	milkData[($("#current-selected-date").text()).split(" ")[1]].buffalo[currentDate-1] = buffaloMilk;
	milkData[($("#current-selected-date").text()).split(" ")[1]].mixMilk[currentDate-1] = mixMilk;
	localStorage.setItem("dataOfMilk", JSON.stringify(milkData));
}

//delete selected date total milk quantity from milk data object and calendar
function deleteDateData(event){
	if(($("#current-selected-date").text()).split(" ")[1] == "Date"){
		alert("Please select the date before Delete");
	}else{
		$($(event.target).parent().siblings()[0]).text("Total:0.00");
		const dateNumber = $($(event.target).siblings()[0]).text();
		milkData[($("#current-selected-date").text()).split(" ")[1]].cow[dateNumber-1] = 0;
		milkData[($("#current-selected-date").text()).split(" ")[1]].buffalo[dateNumber-1] = 0;
		milkData[($("#current-selected-date").text()).split(" ")[1]].mixMilk[dateNumber-1] = 0;
		localStorage.setItem("dataOfMilk", JSON.stringify(milkData));	
	}
}

function monthCalculator(){
	console.log();
	try{
		if(($("#current-selected-date").text()).split(" ")[1] !== "Date"){
			let cowMilkTotal = milkData[($("#current-selected-date").text()).split(" ")[1]].cow.reduce((sum, item) => sum+=item, 0);
			let buffaloMilkTotal = milkData[($("#current-selected-date").text()).split(" ")[1]].buffalo.reduce((sum, item) => sum+=item, 0);
			let mixMilkTotal = milkData[($("#current-selected-date").text()).split(" ")[1]].mixMilk.reduce((sum, item) => sum+=item, 0);
			$("tbody").replaceWith(`					
							<tbody>
								<tr>
									<td>Total Quantity</td>
									<td>${(cowMilkTotal).toFixed(2)}</td>
									<td>${(buffaloMilkTotal).toFixed(2)}</td>
									<td>${(mixMilkTotal).toFixed(2)}</td>
								</tr>
								<tr>
									<td>Milk Price</td>
									<td>45</td>
									<td>70</td>
									<td>55</td>
								</tr>
								<tr>
									<td>Total Price</td>
									<td>&#x20B9; ${(45*cowMilkTotal).toFixed(2)}</td>
									<td>&#x20B9; ${(70*buffaloMilkTotal).toFixed(2)}</td>
									<td>&#x20B9; ${(55*mixMilkTotal).toFixed(2)}</td>
								</tr>
							</tbody>
							`);
			$("#total>div>p").text(`This month total is ${(45*cowMilkTotal + 70*buffaloMilkTotal+ 55*mixMilkTotal).toFixed(2)}`);
			milkData[($("#current-selected-date").text()).split(" ")[1]].total = (45*cowMilkTotal + 70*buffaloMilkTotal+ 55*mixMilkTotal).toFixed(2);
			localStorage.setItem("dataOfMilk", JSON.stringify(milkData));
		}else{
			throw "Select a month date for which you want to calculate total";
		}
	}catch(err){
		alert(err);
	}
}

function renderCalendar(){
date.setDate(1);

const months = [
"January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

console.log();

const currentMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

let lastMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
const nextDays = 7 - lastDayIndex - 1;

document.querySelector(".date p:nth-child(1)").textContent = months[date.getMonth()];
document.querySelector(".date p:nth-child(2)").textContent = new Date().toDateString();

let days = "";

for(let i = date.getDay(); i>0; i--){
	days += `<div class="prev-date">${lastMonthDays - i + 1}</div>`;
}

for(let i=1; i<=currentMonthDays;i++){

	let dayTotal = milkData[months[date.getMonth()].substring(0, 3)].cow[i-1]
		+milkData[months[date.getMonth()].substring(0, 3)].buffalo[i-1]
		+milkData[months[date.getMonth()].substring(0, 3)].mixMilk[i-1]
		? milkData[months[date.getMonth()].substring(0, 3)].cow[i-1]
			+milkData[months[date.getMonth()].substring(0, 3)].buffalo[i-1]
			+milkData[months[date.getMonth()].substring(0, 3)].mixMilk[i-1]
		: 0;

	if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
		days += `<div class="today ${'date' + i}">
					<div>
						<i class="fa fa-trash" aria-hidden="true" onclick="deleteDateData(event)"></i>
						<p class="date-para">${i}</p>
					</div>
					<p>Total:${(dayTotal).toFixed(2)}</p>
					<button onclick="fillDateData(event)">Select</button>
				</div>`;
		document.querySelector(".days").innerHTML = days;	
	}
	else{
		days += `<div class="${'date' + i}">
					<div>
						<i class="fa fa-trash" aria-hidden="true" onclick="deleteDateData(event)"></i>
						<p class="date-para">${i}</p>
					</div>
					<p>Total:${(dayTotal).toFixed(2)}</p>
					<button onclick="fillDateData(event)">Select</button>
				</div>`;
		document.querySelector(".days").innerHTML = days;
	}
}

for(let i=1; i<=nextDays; i++){
	days += `<div class="next-date"">${i}</div>`;
	document.querySelector(".days").innerHTML = days;
	}
}

document.querySelector(".prev").addEventListener("click", () => {
	date.setMonth(date.getMonth() - 1);
	renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
	date.setMonth(date.getMonth() + 1);
	renderCalendar();
});

renderCalendar();
