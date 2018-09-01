(ns micro_services.user-test
  (:require [cljs.test :refer-macros [deftest is testing run-tests]]))

(enable-console-print!)

(defn create-broker [config] {})

; (use-fixtures :once
;   {:before
;    #(async done
;             (go
;                 (.createService broker (user-service))
;                 (.start broker)
;             (done)))
;    })

; (deftest test-async
;   (let [broker (create-broker {:logLevel "info"})]
;     (async done
;            (go
;              (.createService broker (user-service))
;              (.start broker)
;              (is (= "ok" (.call broker "user-service.new" {:email "john@travolta.com"
;                                                :name: "John Travolta"})))
;              (done)))))

(defn test-log
  [text]
  (go
    (println (str "log line -> " text))
    2))

(deftest test-1
  (is (= 2 (test-log "Oliver"))))

(deftest test-2
  (is (= 2 3)))

(test-log "John")

(run-tests)

