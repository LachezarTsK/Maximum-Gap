
import java.util.Arrays;

public class Solution {

    public int maximumGap(int[] nums) {
        raidixSort(nums);
        int maximumGap = 0;
        for (int i = 1; i < nums.length; ++i) {
            maximumGap = Math.max(maximumGap, nums[i] - nums[i - 1]);
        }
        return maximumGap;
    }

    private void raidixSort(int[] nums) {
        int maxValue = Arrays.stream(nums).max().getAsInt();
        int maxNumberOfDigits = numberOfDigits(maxValue);
        int digitPlace = 1;

        for (int i = 0; i < maxNumberOfDigits; ++i) {
            countingSort(nums, digitPlace);
            digitPlace *= 10;
        }
    }

    private void countingSort(int[] nums, int digitPlace) {
        int[] frequency = new int[10];
        int[] tempStore = new int[nums.length];

        for (int i = 0; i < nums.length; ++i) {
            ++frequency[(nums[i] / digitPlace) % 10];
        }

        for (int i = 1; i < frequency.length; ++i) {
            frequency[i] += frequency[i - 1];
        }

        for (int i = nums.length - 1; i >= 0; --i) {
            tempStore[frequency[(nums[i] / digitPlace) % 10] - 1] = nums[i];
            --frequency[(nums[i] / digitPlace) % 10];
        }

        System.arraycopy(tempStore, 0, nums, 0, nums.length);
    }

    private int numberOfDigits(int value) {
        int digits = 0;
        while (value > 0) {
            ++digits;
            value /= 10;
        }
        return digits != 0 ? digits : 1;
    }
}
