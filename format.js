function parseAmount(amount = "1", decimal = 18) {
  if (!amount) return "0";

  amount = cleanupAmount(amount);

  const split = amount.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";
  if (split.length > 2 || fracPart.length > decimal) {
    throw new Error(`Cannot parse '${amount}' as bignumber`);
  }
  return trimLeadingZeroes(wholePart + fracPart.padEnd(decimal, "0"));
}
function cleanupAmount(amount) {
  return amount.replace(/,/g, "").trim();
}
function trimLeadingZeroes(value) {
  value = value.replace(/^0+/, "");
  if (value === "") {
    return "0";
  }
  return value;
}

module.exports = {
  parseAmount,
};
