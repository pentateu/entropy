# mobile-app3

A Clojure library designed to ... well, that part is up to you.

## Setup

Instal re-natal
https://github.com/drapanjanas/re-natal

Install lein
https://leiningen.org/

Install Clojure
```
brew install clojure
```

## Usage


Development mode with Figwheel
```
$ re-natal use-figwheel
```

Start a Figwheel REPL from the command line with:
```
$ lein figwheel ios

 $ lein figwheel android
```

Starting Figwheel REPL from nREPL
```
user=> (start-figwheel "ios")
```
Or Adnroid
```
user=> (start-figwheel "android")
```
Or, for both type:
```
user=> (start-figwheel "ios" "android")
```

iOS
Using iOS simulator
```
re-natal use-ios-device simulator
react-native run-ios
```
Using real iOS device
```
re-natal use-ios-device real
```
