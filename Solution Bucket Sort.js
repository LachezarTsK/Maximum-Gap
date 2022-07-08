
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
    if (nums.length < 2) {
        return 0;
    }

    this.minInputValue = Math.min(...nums);
    this.maxInputValue = Math.max(...nums);
    this.bucketSize = Math.max(1, Math.floor((this.maxInputValue - this.minInputValue) / (nums.length - 1)));
    const numberOfBuckets = 1 + Math.floor((this.maxInputValue - this.minInputValue) / this.bucketSize);

    const buckets = new Array(numberOfBuckets);
    initializeBuckets(buckets, nums);

    return findMaximumGap(buckets);
};

function Bucket() {
    this.minValue = Number.MAX_SAFE_INTEGER;
    this.maxValue = Number.MIN_SAFE_INTEGER;
    this.used = false;
}

/**
 * @param {Bucket[]} buckets
 * @return {number}
 */
function findMaximumGap(buckets) {
    let maximumGap = 0;
    let previousMaxValue = this.minInputValue;

    for (let bucket of buckets) {
        if (bucket.used) {
            maximumGap = Math.max(maximumGap, bucket.minValue - previousMaxValue);
            previousMaxValue = bucket.maxValue;
        }
    }
    return maximumGap;
}

/**
 * @param {Bucket[]} buckets
 * @param {number[]} nums
 * @return {void}
 */
function initializeBuckets(buckets, nums) {
    for (let i = 0; i < buckets.length; ++i) {
        buckets[i] = new Bucket();
    }

    for (let value of nums) {
        let index = getBucketIndex(value);
        buckets[index].used = true;
        buckets[index].minValue = Math.min(buckets[index].minValue, value);
        buckets[index].maxValue = Math.max(buckets[index].maxValue, value);
    }
}

/**
 * @param {number} value
 * @return {number}
 */
function getBucketIndex(value) {
    return Math.floor((value - this.minInputValue) / this.bucketSize);
}
