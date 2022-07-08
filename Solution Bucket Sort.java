
import java.util.Arrays;

public class Solution {

    int minInputValue;
    int maxInputValue;
    int bucketSize;

    public int maximumGap(int[] nums) {
        if (nums.length < 2) {
            return 0;
        }

        minInputValue = Arrays.stream(nums).min().getAsInt();
        maxInputValue = Arrays.stream(nums).max().getAsInt();
        bucketSize = Math.max(1, (maxInputValue - minInputValue) / (nums.length - 1));
        int numberOfBuckets = 1 + ((maxInputValue - minInputValue) / bucketSize);

        Bucket[] buckets = new Bucket[numberOfBuckets];
        initializeBuckets(buckets, nums);

        return findMaximumGap(buckets);
    }

    private int findMaximumGap(Bucket[] buckets) {
        int maximumGap = 0;
        int previousMaxValue = minInputValue;

        for (Bucket bucket : buckets) {
            if (bucket.used) {
                maximumGap = Math.max(maximumGap, bucket.minValue - previousMaxValue);
                previousMaxValue = bucket.maxValue;
            }
        }
        return maximumGap;
    }

    private void initializeBuckets(Bucket[] buckets, int[] nums) {
        for (int i = 0; i < buckets.length; ++i) {
            buckets[i] = new Bucket();
        }

        for (int value : nums) {
            int index = getBucketIndex(value);
            buckets[index].used = true;
            buckets[index].minValue = Math.min(buckets[index].minValue, value);
            buckets[index].maxValue = Math.max(buckets[index].maxValue, value);
        }
    }

    private int getBucketIndex(int value) {
        return (value - minInputValue) / bucketSize;
    }

}

class Bucket {

    int minValue = Integer.MAX_VALUE;
    int maxValue = Integer.MIN_VALUE;
    boolean used = false;
}
