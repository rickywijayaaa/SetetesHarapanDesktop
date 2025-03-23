from passlib.hash import bcrypt

# Hash password
hashed = bcrypt.hash("passwordku123")
print("🔐 Hashed password:", hashed)

# Verify password
is_valid = bcrypt.verify("passwordku123", hashed)
print("✅ Password cocok:", is_valid)
