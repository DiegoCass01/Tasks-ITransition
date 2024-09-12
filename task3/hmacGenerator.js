const crypto = require("crypto");

class HmacGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex"); // 256 bits = 32 bytes
  }

  static generateHmac(key, message) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(message);
    return hmac.digest("hex");
  }
}

module.exports = HmacGenerator;