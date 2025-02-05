# UniConverter

## Introduction

This bot is designed to make unit conversions fast, easy, and accessible directly within your Discord server. From length and weight to temperature and data, this bot supports a wide range of unit types and conversions.

## Features

**UniConverter** can convert the following units:

- **Area** (Square kilometer, square mile, square meter, square yard, square Foot, square inch, acre, hectare)
- **Charge** (Coulomb, millicoulomb, microcoulomb, electorn charge, faraday, ampere-hour, milliampere-hour)
- **Currency** (AUD, BRL, CAD, CHF, CNY, DKK, EUR, GBP, HKD, IDR, INR, JPY, KRW, MYR, MXN, NOK, NZD, PHP, RUB, SEK, SGD, TRY, USD, ZAR)
- **Data Transfer Rate** (Bits per second, Kilobits per second, Kibibits per second, Megabits per second, Megabytes per second, mebibits per second, gigabits per second, gigabytes per second, gibibits per second, terabits per second, terabytes per second, tebibits per second)
- **Digital Storage** (Bits, kilobits, kibibits, megabits, mebibits, gigabits, gibibits, terabits, tebibits, petabits, pebibits, bytes, kilobytes, kibibyts, megabytes, mebibytes, gigabytes, gibibytes, terabytes, tebibytes, petabytes, pebibytes)
- **Electric potential** (Volt, millivolt, microvolt, kilovolt, megavolt, statvolt, abvolt)
- **Electric resistance** (Ohm, milliohm, microohm, nanoohm, kiloohm, megohm, statohm, quantized hall resistance)
- **Energy** (Joules, kilojoules, gram calories, kilocalories, watt hours, kilowatt hours, electronvolts, British thermal units, US therms, foot-pounds)
- **Force** (Newton, pound-force, gram-force, kilogram-force, poundal, ounce-force, ton-force, pond, kilopond, dyne, joule-per-meter, pound-foot/square second)
- **Frequency** (Hertz, kilohertz, megahertz, gigahertz)
- **Fuel Economy** (Miles per gallon, miles per gallon (imperial), kilometer per liter, liter per 100 kilometers)
- **Length** (Inch, foot, yard, mile, nanometer, micrometer, millimeter, centimeter, meter, kilometer)
- **Luminance** (Candela per square meter, candela per square foot, stilb, nit, millinit, lambert, millilambert, foot-lambert, apostilb/blondel)
- **Magnetic flux** (Weber, milliweber, microweber, volt second, unit pole, megaline, kiloline, line, maxwell, tesla square meter, tesla square centimeter, gauss square centimeter, magnetic flux quantum)
- **Magnetic field strength** (Ampere/meter, ampere turn/meter, kiloampere/meter, oersted)
- **Mass** (Ounce, pound, stone, US ton, imperial ton, microgram, milligram, gram, kilogram, metric ton)
- **Plane Angle** (Degree, radian, gradian, minute of arc, miliradian, arcsecond)
- **Pressure** (Bar, pascal, pound-force per square inch (PSI), standard atmosphere, torr)
- **Radiation activity** (Becquerel, curie, millicurie, microcurie, nanocurie, picocurie, Rutherford)
- **Radiation dose** (Gray, milligray, microgray, rad, sievert, millisievert, microsievert, rem, erg per gram)
- **Speed** (Mile per hour, kilometer per hour, meter per second, foot per second, knots)
- **Temperature** (Fahrenheit, celsius, kelvin)
- **Time** (Nanosecond, microsecond, millisecond, second, minute, hour, day, week, month, year, decade, century, millennium)
- **Volume** (US gallon, US quart, US pint, US cup, US fluid ounce, US tablespoon, US teaspoon, cubic meter, liter, milliliter, imperial gallon, imperial quart, imperial pint, imperial cup, imperial fluid ounce, imperial tablespoon, imperial teaspoon, cubic foot, cubic inch)
- **Power** (Watt, kilowatt, horsepower, megawatt, gigawatt, British thermal unit per hour, decibel milli-watt)
- **Time zones** (AKST, AEST, BRT, CET, CST (Central & China Standard Time), EET, EST, GST, GMT, HST, ICT, IST, JST, MST, NZST, PST, SAST, SGT, UTC, WAT)

_Note: Currency exchange rate conversions are limited to 5,000 requests per month, resetting on the first day of every month._

## Commands

### General Format

```bash
/[category] [value] [original unit] [new unit]
```

_Note: All arguments are required in exception to the additional AM/PM within the timezone command_

### Examples

![](https://github.com/Pogoretskiy777/discord-bot/blob/main/temptest.gif)
![](https://github.com/Pogoretskiy777/discord-bot/blob/main/tztest.gif)

## Usage

To add the discord bot to your server, invite the bot to your server using the following [link](https://discord.com/oauth2/authorize?client_id=1325893912425922621&permissions=2147483648&integration_type=0&scope=bot+applications.commands).
