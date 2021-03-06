angular.module('jobManagement')
    .service('Job', ['JobRes', '$q', function job(JobRes, $q) {
        var jobCache = {};
        this.getData = function getJobs(jobGroupId) {
            var deferred = $q.defer();
            var jobGroup = jobCache[jobGroupId];
            if (jobGroup) {
                deferred.resolve(jobGroup);
            } else {
                jobCache[jobGroupId] = {};
                JobRes.query({jobGroupId: jobGroupId}, function (response) {
                    jobCache[jobGroupId].jobs = response;
                    deferred.resolve(jobCache[jobGroupId]);
                });
            }
            return deferred.promise;
        };

        this.getAll = function getAllData() {
            var deferred = $q.defer();
            JobRes.query(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
    ]);