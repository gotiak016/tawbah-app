const fs = require('fs');
const path = require('path');

const gradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');

if (fs.existsSync(gradlePath)) {
  let content = fs.readFileSync(gradlePath, 'utf8');

  const releaseSigning = `        release {
            storeFile file("tawbah-release-key.keystore")
            storePassword "tawbah123456"
            keyAlias "tawbah-key-alias"
            keyPassword "tawbah123456"
        }
`;

  if (content.includes('signingConfigs {') && !content.includes('tawbah-release-key.keystore')) {
    content = content.replace(/signingConfigs\s*\{/, 'signingConfigs {\n' + releaseSigning);
  }

  content = content.replace(/signingConfig signingConfigs\.debug/g, 'signingConfig signingConfigs.release');

  fs.writeFileSync(gradlePath, content, 'utf8');
  console.log('Successfully injected Tawbah release signing configuration!');
} else {
  console.error('android/app/build.gradle not found at ' + gradlePath);
}
