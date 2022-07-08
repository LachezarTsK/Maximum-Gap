
#include <vector>
using namespace std;

class Solution {
    
public:
    int maximumGap(vector<int>& nums) {
        raidixSort(nums);
        int maximumGap = 0;
        for (int i = 1; i < nums.size(); ++i) {
            maximumGap = max(maximumGap, nums[i] - nums[i - 1]);
        }
        return maximumGap;
    }

private:
    void raidixSort(vector<int>& nums) {
        int maxValue = *max_element(nums.begin(), nums.end());
        int maxNumberOfDigits = numberOfDigits(maxValue);
        int digitPlace = 1;

        for (int i = 0; i < maxNumberOfDigits; ++i) {
            countingSort(nums, digitPlace);
            digitPlace *= 10;
        }
    }

    void countingSort(vector<int>& nums, int digitPlace) {
        array<int, 10> frequency{};
        vector<int> tempStore(nums.size());

        for (int i = 0; i < nums.size(); ++i) {
            ++frequency[(nums[i] / digitPlace) % 10];
        }

        for (int i = 1; i < frequency.size(); ++i) {
            frequency[i] += frequency[i - 1];
        }

        for (int i = nums.size() - 1; i >= 0; --i) {
            tempStore[frequency[(nums[i] / digitPlace) % 10] - 1] = nums[i];
            --frequency[(nums[i] / digitPlace) % 10];
        }

        /*
        nums = tempStore: Java and JavaScript, 'nums' refers to 'tempStore'.
        nums = tempStore: C++, individual values of 'tempStore' are copied to 'nums'.
         */
        nums = tempStore;
    }

    int numberOfDigits(int value) {
        int digits = 0;
        while (value > 0) {
            ++digits;
            value /= 10;
        }
        return digits != 0 ? digits : 1;
    }
};
