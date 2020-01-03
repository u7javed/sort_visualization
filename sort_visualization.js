var list;
var i;
var j;
var min_val;
var key;
var keyFont;
var sizeSlider;
var isSorting = false;
var timeDelay = 40;

var bubbleSortRun = false;
var selectionSortRun = false;
var insertionSortRun = false;
var quickSortRun = false;
var mergeSortRun = false;
var heapSortRun = false;

//asthetic variavles

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}

function resetVariables() {
	frameRate(60);
	list.elements = [];
	list.isSorted = false;
	bubbleSortRun = false;
	selectionSortRun = false;
	insertionSortRun = false;
	quickSortRun = false;
	mergeSortRun = false;
	heapSortRun = false;
}

function preload() {
	keyFont = loadFont("assets/Kanit-Regular.ttf");
	sizeSlider = createSlider(10, 250, 50, 5);
}

function mousePressed() {
	if(mouseX >= width/1.72 && mouseX <= (width/1.72 + 162) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		if(isSorting) {
			isSorting = false;
		}
		list.fill();
		resetVariables();
	}
	if(!isSorting) {
	//bubble sort
		if(mouseX >= width/32 && mouseX <= (width/32 + 80) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			bubbleSortRun = true;
			setupSort();
		}

		//selection sort
		if(mouseX >= width/8.5 && mouseX <= (width/8.5 + 96) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			selectionSortRun = true;
			setupSort();
		}

		//insertion Sort
		if(mouseX >= width/4.6 && mouseX <= (width/4.6 + 92) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			insertionSortRun = true;
			setupSort();
		}

		//quickSort
		if(mouseX >= width/3.2 && mouseX <= (width/3.2 + 72) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			quickSortRun = true;
			setupSort();
		}

		//mergeSort
		if(mouseX >= width/2.55 && mouseX <= (width/2.55 + 74) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			mergeSortRun = true;
			setupSort();
		}

		//heap Sort
		if(mouseX >= width/2.1 && mouseX <= (width/2.1 + 66) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
			isSorting = true;
			heapSortRun = true;
			setupSort();
		}
	}
}

function List() {
	this.elements = [];
	this.highlight = [];
	this.highlightPick = [];
	this.size = Math.floor(sizeSlider.value());
	this.isSorted = false;
	this.length = width/2;

	this.show = function() {
		push();
		for(var i = 0; i < this.elements.length; i++) {
			if(!this.isSorted) {
				if(this.highlight[i]) {
					if(quickSortRun) {
						fill(245, 138, 44);
					} else {
						fill(0, 200, 0);
					}
				} else if(this.highlightPick[i]) {
					fill(255, 0, 0);
				} else {
					fill(255);
				}
			} else {
				fill(38, 185, 201);
			}
			rect(width/4 + i*(this.length/this.elements.length), height/1.1 , this.length/this.elements.length, -this.elements[i]*(height/36));
		}
		pop();
		push();
		stroke(255)
		strokeWeight(3);
		line(width/4 - 10, height/1.1, width/4 + this.length + 10, height/1.1);
		pop();
	}

	this.update = function(val) {
		this.size = Math.floor(val);
		this.fill();
		if(list.size > 80) {
			timeDelay = 20;
		} else if(list.size > 150) {
			timeDelay = 10;
		} else if(list.size < 30) {
			timeDelay = 50;
		}
	}

	this.fill = function() {
		if(this.size != this.elements.length) {
			this.elements = [];
			for(var i = 0; i < this.size; i++) {
				this.elements[i] = random(1, 25);
				this.highlight[i] = false;
				this.highlightPick[i] = false;
			}
		}
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	list = new List();
	list.fill();
	push();
	sizeSlider.position(width - width/6.4, height/3);
	sizeSlider.size(280, 140);
	sizeSlider.style('transform: rotate(' + (270) + 'deg);');
	pop();
}

function draw() {
	background(0);
	menuBar();
	list.show();
	if(!isSorting) {
		var val = sizeSlider.value();
		list.update(val);
	} else if(isSorting) {
		if(selectionSortRun) {
			selectionSort();
		} else if(bubbleSortRun) {
			bubbleSort();
		} else if(insertionSortRun) {
			insertionSort();
		} else {
			list.isSorted = true;
			for(var k = 0; k < list.elements.length - 1; k++) {
				if(list.elements[k] > list.elements[k + 1]) {
					list.isSorted = false;
				}
			}
		}
	}
}

function setupSort() {
	if(bubbleSortRun) {
		i = 0;
		j = 0;
	} else if(selectionSortRun) {
		i = 0;
		j = i;
		min_val = i;
	} else if(insertionSortRun) {
		i = 1;
		j = i - 1;
		key = list.elements[i];
	} else if(quickSortRun) {
		i = 0;
		j = 0;
		quickSort(list.elements, 0, list.elements.length - 1);
	} else if(mergeSortRun) {
		i = 0;
		j = 0;
		mergeSort(list.elements, 0, list.elements.length - 1);
	} else if(heapSortRun) {
		i = 0;
		j = 0;
		heapSort(list.elements);
	}
}

function bubbleSort() {
		if(list.elements[j] > list.elements[j + 1]) {
			list.highlightPick[j] = true;
			list.highlightPick[j + 1] = false;
			swap(j, j + 1, true);
		} else {
			list.highlightPick[j] = false;
		}
		j++;
		if(j >= list.elements.length - i - 1) {
			j = 0;
			i++;
			if(i < list.elements.length) {
				list.highlight[list.elements.length - i] = true
			}
		}
		if(i >= list.elements.length) {
			list.highlight[0] = true
			list.isSorted = true;
		}

}

function selectionSort() {
	frameRate(list.size/2);
	min_val = i;
	for(j = i + 1; j < list.elements.length; j++) {
		if(list.elements[j] < list.elements[min_val]) {
			list.highlightPick[min_val] = false;
			list.highlightPick[j] = true;
			min_val = j;
		}
	}
	for(var k = 0; k < list.elements.length; k++) {
		if(list.elements[k] != list.elements[min_val]) {
			list.highlightPick[k] = false;
		}
	}
	list.highlight[min_val] = true;
	swap(min_val, i,	false);
	i++;
	if(i >= list.elements.length) {
		selectionSortRun = false;
		list.isSorted = true;
	}
}

function insertionSort() {
	if(j >= 0 && list.elements[j] > key) {
		list.highlightPick[j] = true;
		list.highlightPick[j + 1] = false;
		list.elements[j + 1] = list.elements[j];
		j -= 1;
	} else {
		list.highlight[j] = true;
		list.elements[j + 1] = key;
		i++;
		key = list.elements[i];
		j = i - 1;
	}

	if(i >= list.elements.length) {
		for(var k = 0; k < i; k++) {
			list.highlight[k] = true;
		}
		insertionSortRun = false;
		list.isSorted = true;
	}
}

async function quickSort(array, start, end) {
	if(!isSorting) {
		return;
	}
	if(start >= end) {
		return;
	}

	var index = await partition(array, start, end);
	list.highlightPick[index] = false;
	if(!isSorting) {
		return;
	}

	// await Promise.all([
	// 	quickSort(array, start, index - 1),
	// 	quickSort(array, index + 1, end)
	// ]);

	//not together

	await quickSort(array, start, index - 1);
	await quickSort(array, index + 1, end);
	if(!isSorting) {
		return;
	}
}

async function partition(array, start, end) {
	if(!isSorting) {
		return;
	}
	for(var k = start; k < end; k++) {
		list.highlight[k] = true;
		if(!isSorting) {
			return;
		}
	}
	var piv = start;
	var pivVal = array[end];
	list.highlightPick[piv] = true;
	list.highlight[piv] = false;
	for(var i = start; i < end; i++) {
		if(array[i] < pivVal) {
			await waitTimer(timeDelay);
			await swap(i, piv);
			if(!isSorting) {
				return;
			}
			list.highlightPick[piv] = false;
			list.highlight[piv] = true;
			piv++;
			if(!isSorting) {
				return;
			}
			list.highlightPick[piv] = true;
			list.highlight[piv] = false;
			if(!isSorting) {
				return;
			}
		}
	}

	await swap(piv, end);
	for(var k = start; k < end; k++) {
		if(k != piv)	{
			list.highlight[k] = false;
			if(!isSorting) {
				return;
			}
		}
	}
	return piv;
}

async function mergeSort(array, start, end) {
	if(!isSorting) {
		return;
	}
	if(start < end) {
		var middle = Math.floor((start + end) / 2);
		if(!isSorting) {
			return;
		}

		await mergeSort(array, start, middle);
		await mergeSort(array, middle + 1, end);
		if(!isSorting) {
			return;
		}
		await 	merge(array, start, middle, end);
		if(!isSorting) {
			return;
		}
	}
}

async function merge(array, start, middle, end) {
	if(!isSorting) {
		return;
	}
	var n1 = middle - start + 1;
	var n2 = end - middle;

	var leftArr = [];
	var rightArr = [];


	for(var l = 0; l < n1; l++) {
		leftArr[l] = array[start + l];
		if(!isSorting) {
			return;
		}
	}
	for(var l = 0; l < n2; l++) {
		rightArr[l] = array[middle + 1 + l];
		if(!isSorting) {
			return;
		}
	}

	var x = 0, y = 0, z = start;
	while(x < n1 && y < n2) {
		await waitTimer(timeDelay - 10);
		if(leftArr[x] <= rightArr[y]) {
			array[z] = leftArr[x];
			x++;
		} else {
			array[z] = rightArr[y];
			y++;
		}

		if(!isSorting) {
			return;
		}
		list.highlight[z] = true;
		z++;
		list.highlightPick[z] = true;
		if(z == list.elements.length - 1) {
			list.highlight[z] = true;
		}
	}

	while(x < n1) {
		array[z] = leftArr[x];
		x++;
		z++;
		if(!isSorting) {
			return;
		}
	}

	while(y < n2) {
		array[z] = rightArr[y];
		y++;
		z++;
		if(!isSorting) {
			return;
		}
	}
}

async function heapSort(array) {
	if(!isSorting) {
		return;
	}
	var n = array.length;
	for(var x = Math.floor(n/2); x >= 0; x -= 1) {
		await waitTimer(timeDelay);
		if(!isSorting) {
			return;
		}
		heap_root(array, x, n);
	}

	for(var x = n - 1; x > 0; x --) {
		await waitTimer(timeDelay);
		var temp = array[0];
		array[0] = array[x];
		array[x] = temp;
		list.highlight[x] = true;
		n--;
		if(!isSorting) {
			return;
		}
		await heap_root(array, 0, n);
	}
	heapSortRun = false;
	list.highlight[0] = true;
	if(!isSorting) {
		return;
	}
}

async function heap_root(arr, x, n) {
	if(!isSorting) {
		return;
	}
	var left = 2 * x + 1;
	var right = 2 * x + 2;
	var max = x;

	if(left < n && arr[left] > arr[max]) {
		max = left;
		if(!isSorting) {
			return;
		}
	}

	if(right < n && arr[right] > arr[max]) {
		max = right;
		if(!isSorting) {
			return;
		}
	}

	if(max != x) {
		var temp = arr[x];
		arr[x] = arr[max];
		arr[max] = temp;
		list.highlightPick[x] = true;
		await heap_root(arr, max, n);
		if(!isSorting) {
			return;
		}
	}
}

function swap(index1, index2, bool) {
	var temp = list.elements[index1];
	var highlightTemp = list.highlight[index1];
	list.elements[index1] = list.elements[index2];
	list.highlight[index1] = list.highlight[index2];
	list.elements[index2] = temp;
	list.highlight[index2] = highlightTemp;
	if(bool) {
		var highlightPicktemp = list.highlightPick[index1];
		list.highlightPick[index1] = list.highlightPick[index2];
		list.highlightPick[index2] = highlightPicktemp;
	}
}

function waitTimer(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function menuBar() {
	push();
	fill(0, 100, 180);
	rect(-2, -2, width + 4, height/6);
	rect(width - 100, height/6 + 20, 85, height/2)
	fill(0);
	strokeWeight(3);
	line(width/1.8, 8, width/1.8, height/6.6)
	line(width/1.36, 8, width/1.36, height/6.6)
	fill(255);
	textFont(keyFont);
	textSize(26);
	text("Umer Javed", width/2 - width/20, height - height/40);
	textSize(15);

	//bubbleSort
	if(mouseX >= width/32 && mouseX <= (width/32 + 80) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Bubble Sort ", width/32, height/11);

	//selection sort
	if(mouseX >= width/8.5 && mouseX <= (width/8.5 + 96) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Selection Sort", width/8.5, height/11);

	//insertion Sort
	if(mouseX >= width/4.6 && mouseX <= (width/4.6 + 92) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Insertion Sort", width/4.6, height/11);

	//quickSort
	if(mouseX >= width/3.2 && mouseX <= (width/3.2 + 72) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Quick Sort", width/3.2, height/11);

	//mergeSort
	if(mouseX >= width/2.55 && mouseX <= (width/2.55 + 74) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Merge Sort", width/2.55, height/11);

	//heap Sort
	if(mouseX >= width/2.1 && mouseX <= (width/2.1 + 66) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("Heap Sort", width/2.1, height/11);

	//SHUFFLE
	if(mouseX >= width/1.72 && mouseX <= (width/1.72 + 162) && mouseY >= height/13.5 && mouseY <= (height/13.5 + 10)) {
		fill(255, 51, 0);
	} else {
		fill(255);
	}
	text("SHUFFLE/RESET ARRAY", width/1.72, height/11);
	fill(255);
	text("NUMBER of ELEMENTS in ARRAY", width/1.34, height/11);
	textSize(40);
	text(Math.floor(sizeSlider.value()) ,width/1.07, height/9.6)

	if(list.isSorted) {
		fill(38, 185, 201);
		textSize(80);
		text("SORTED!", width/10, height/3);
	}


	pop();

}
