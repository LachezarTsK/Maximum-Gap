
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
    raidixSort(nums);
    let maximumGap = 0;
    for (let i = 1; i < nums.length; ++i) {
        maximumGap = Math.max(maximumGap, nums[i] - nums[i - 1]);
    }
    return maximumGap;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
function raidixSort(nums) {
    const maxValue = Math.max(...nums);
    const maxNumberOfDigits = numberOfDigits(maxValue);
    let digitPlace = 1;

    for (let i = 0; i < maxNumberOfDigits; ++i) {
        countingSort(nums, digitPlace);
        digitPlace *= 10;
    }
}

/**
 * @param {number[]} nums
 * @param {number} digitPlace
 * @return {void}
 */
function countingSort(nums, digitPlace) {
    const frequency = new Array(10).fill(0);
    const tempStore = new Array(nums.length).fill(0);

    for (let i = 0; i < nums.length; ++i) {
        ++frequency[Math.floor(nums[i] / digitPlace) % 10];
    }

    for (let i = 1; i < frequency.length; ++i) {
        frequency[i] += frequency[i - 1];
    }

    for (let i = nums.length - 1; i >= 0; --i) {
        tempStore[frequency[Math.floor(nums[i] / digitPlace) % 10] - 1] = nums[i];
        --frequency[Math.floor(nums[i] / digitPlace) % 10];
    }

    for (let i = nums.length - 1; i >= 0; --i) {
        nums[i] = tempStore[i];
    }
}

/**
 * @param {number} value
 * @return {number}
 */
function numberOfDigits(value) {
    let digits = 0;
    while (value > 0) {
        ++digits;
        value = Math.floor(value / 10);
    }
    return digits !== 0 ? digits : 1;
}
