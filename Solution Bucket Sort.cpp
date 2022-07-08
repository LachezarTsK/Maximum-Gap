
#include <vector>
using namespace std;

class Solution {

    struct Bucket {
        int minValue = INT_MAX;
        int maxValue = INT_MIN;
        bool used = false;
    };

    int minInputValue;
    int maxInputValue;
    int bucketSize;

public:
    int maximumGap(vector<int>& nums) {
        if (nums.size() < 2) {
            return 0;
        }

        minInputValue = *min_element(nums.begin(), nums.end());
        maxInputValue = *max_element(nums.begin(), nums.end());
        bucketSize = max(1, (maxInputValue - minInputValue) / (static_cast<int> (nums.size()) - 1));
        int numberOfBuckets = 1 + ((maxInputValue - minInputValue) / bucketSize);

        vector<Bucket> buckets(numberOfBuckets);
        initializeBuckets(buckets, nums);

        return findMaximumGap(buckets);
    }

private:
    int findMaximumGap(const vector<Bucket>& buckets) {
        int maximumGap = 0;
        int previousMaxValue = minInputValue;

        for (Bucket bucket : buckets) {
            if (bucket.used) {
                maximumGap = max(maximumGap, bucket.minValue - previousMaxValue);
                previousMaxValue = bucket.maxValue;
            }
        }
        return maximumGap;
    }

    void initializeBuckets(vector<Bucket>& buckets, const vector<int>& nums) {
        for (int i = 0; i < buckets.size(); ++i) {
            buckets[i] = Bucket();
        }

        for (int value : nums) {
            int index = getBucketIndex(value);
            buckets[index].used = true;
            buckets[index].minValue = min(buckets[index].minValue, value);
            buckets[index].maxValue = max(buckets[index].maxValue, value);
        }
    }

    int getBucketIndex(int value) {
        return (value - minInputValue) / bucketSize;
    }
};
