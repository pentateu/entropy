(ns micro-services.user)

(defn user-service
  "user-service microservice definition"
  []
  {:name "user-service"
   :version "v1.1.0"
   :actions {"new" {:params {:email {:type "string"
                                     :empty false}
                             :name {:type "string"
                                    :empty false}}
                    :handler (fn [context] "ok")}}})

; (defn new-user
;   "Create a new user if data is valid"
;   [context]
;   (if (new-user-isValid context)
;     (happy-response (save-user context))
;     (sad-response context)))

; (defn new-user-isValid
;   "Validate if the input for the new user is valid."
;   [context]
;   :some-value)

; (defn save-user
;   "save the user record to the database"
;   [context]
;   :some-value)

; (defn happy-response
;   "Return the user created or updated."
;   [user]
;   user)

; (defn sad-response
;   "Return the error occured"
;   [context]
;   :some-value)