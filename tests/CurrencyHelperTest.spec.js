import {formatPenceAsString} from "@/helper/currency.js";
import { expect, test } from 'vitest'

test("Formats price of 0 integer as string with pound sign", () => {
    expect(formatPenceAsString(0)).toEqual('£0.00')
})

test("Formats price of 5 integer as string with pound sign", () => {
    expect(formatPenceAsString(5)).toEqual('£0.05')
})

test("Formats price of 25 integer as string with pound sign", () => {
    expect(formatPenceAsString(25)).toEqual('£0.25')
})

test("Formats price of 150 integer as string with pound sign", () => {
    expect(formatPenceAsString(150)).toEqual('£1.50')
})

test("Formats price of 12345 integer as string with pound sign", () => {
    expect(formatPenceAsString(12345)).toEqual('£123.45')
})