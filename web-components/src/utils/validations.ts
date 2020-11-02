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
  timeString:
    "(^(([0-1]?\\d)|(2[0-3]))(:|.|)?[0-5][0-9]$)|(^((0?[1-9])|(1[0-2]))(:|.|)([0-5][0-9])( ||,)([aA]|[pP])[mM]$)|(^([aA]|[pP])[mM]( |,|)((0?[1-9])|(1[0-2]))(|:|.)([0-5][0-9])$)",
  booleanString: "^(?:tru|fals)e$"
};
