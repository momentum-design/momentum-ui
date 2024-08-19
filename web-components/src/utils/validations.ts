/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const ValidationRegex = {
  textString: "[sS]*",
  integerString: "^([+-]?[1-9]\\d*|0)$",
  decimalString: "^[0-9]+([,.]?)+([0-9]+)?$",
  dateString: "^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/](19|20)\\d{2}$",
  dateRangeString:
    "^(((19|20)?[0-9]{2}[- /.]0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])) - (((19|20)?[0-9]{2}[- /.]0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01]))",
  ISODateString: "^\\d{4}-([1][0-2]|[0][1-9])-(0[1-9]|[12][0-9]|3[01])$",
  ISOTimeString: "^([0][1-9]|[1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$",
  ISOString:
    "^\\d{4}-([1][0-2]|[0][1-9])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])(-|\\+)[01]\\d:[0-5]\\d$",
  noPrecedingZerosString: "^(0|[1-9][0-9]?)$",
  allLeadingZeros: "^0+",
  timeString:
    "(^(([0-1]?\\d)|(2[0-3]))(:|.|)?[0-5][0-9]$)|(^((0?[1-9])|(1[0-2]))(:|.|)([0-5][0-9])( ||,)([aA]|[pP])[mM]$)|(^([aA]|[pP])[mM]( |,|)((0?[1-9])|(1[0-2]))(|:|.)([0-5][0-9])$)",
  hourString: "^([1-9]|1[012]|0[1-9])$",
  twentyFourHourString: "^([0-9]|0[0-9]|1[0-9]|2[0-3])$",
  minuteSecondString: "^(?:[0-5][0-9]|[0-9])$",
  amPmString: "([AaPp][Mm])",
  booleanString: "^(?:tru|fals)e$"
};
