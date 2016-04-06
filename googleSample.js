
/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var google = require('googleapis');
var drive = google.drive('v2');

/**
 * The JWT authorization is ideal for performing server-to-server
 * communication without asking for user consent.
 *
 * Suggested reading for Admin SDK users using service accounts:
 * https://developers.google.com/admin-sdk/directory/v1/guides/delegation
 *
 * Note on the private_key.pem:
 * Node.js currently does not support direct access to the keys stored within
 * PKCS12 file (see issue comment
 * https://github.com/joyent/node/issues/4050#issuecomment-8816304)
 * so the private key must be extracted and converted to a passphrase-less
 * RSA key: openssl pkcs12 -in key.p12 -nodes -nocerts > key.pem
 *
 * See the defaultauth.js sample for an alternate way of fetching compute credentials.
 */
var authClient = new google.auth.JWT(
    'intros@dulcet-listener-126405.iam.gserviceaccount.com',
  //  '-----BEGIN RSA PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCV6v2R+HFQuidgKpU3S+Aw1cksqLUXMqWm9Sx432Ro2lB5STjIZSKQxXGP94dKclHFs5qgM/+yD+QCEI+KxYVRKaHG/mVQJmjXsrcjKthUujGNOeR0G6a6KpPMBBRaFUTm0zw2lSjtAuhCgCAi9uPfAoRW2esOi3qpAQCwq5+uIALkHd74IfUjLnLtJTIKl8PGAQbgc2+uXm0K7fOUZqRKhxYLzCdYY05VtAPsNfBBvDRc2J+TSyW/JK3Qwl0b+oCbURlXOnNNWK0I6PF1nsjXLQVOJt6EFkVUmO9rvFiWyQJLNwO/KrvMK/csfkEInGNpNuBSFI1S8oel6mtCZGVNAgMBAAECggEAb66NlA6Wq+LhrnxKiNUXgIniwkg0D8IFMal3pdwVex8X0CLCEFd3No5AGVX3DXi4fiVcTXgvRcEcxIT9yg13UY1IHWwqoVjbxcQ3NhWW7xd+Do1QKUboH8vUKqnnV2x81dALDUZ1JIuD5vZ3+lQeUWYYnHLe7wjtKbW7g+F2pUnCW04xRdhMrjavLP85Kqvaqy9iGuFtDNGjfYh8jVv2EpGkNfcMsy8d8pCz6GXojRY3JpwCsVxLSInYxm4zds5Oaj/6uTSLs6vpSwtJZxQJP1QfRF3kS6MczvfUPvRVNfiAG3OYAxFrk3dXRwB9Ej0Yz+m4E4qMiLRE1kTGri3NAQKBgQDX2u850KJko6VqNLm+8BDDq8B+MzG+Y0YaJsSstcp3pZwF2ZwAGjMOcXzLTcn4q+iQi63DfmQhfnwbQMqkHg7QcYkX83VlSvRzxNcsgUsEU9XuMoWH57E6O0vsdo4R3zpInvpXLkwcG6o2ztB0O6XLjBV/CInU/36nnPR9ZaSZLQKBgQCxzLipmcHZugvHljrR+GL1tFPy/k2d4WcUggtV9haCVNHGW84AUvw8/PuW1DX+47h/hFfv0lX0vOHosPciymt6LD5g4PqQxYQcHgedktJC0p2Esf+SW7apdAga5/bJyxtgpfTx/1KOFmeqimBEx4phzuAr5BYtQBQsKGnWe0pQoQKBgFx4CqFe0iKAxDzyJ1w3ZUcdjZHChp3D02UilIBURE7rICKVbTHSB2s5jLdfNJWVt0QswhyMSYLbt3jJUcXqpnf/GzaqcfEZogzyFyeWn7dT3sJy3CczRwXmHwlGZGgdk89GY4HzcGFeLJXcFQql/slq0k6gLsOTTAOrxkTtxQxlAoGADup3y3KkuplLB7Foudi2pJo+OLJw3H/eX/AQ92MvvDtVZeipvYk4s/0dNigTZ5C/F6OIpQvmPiPiZ90AvqBwp80yZno5Sw/m51z1kpiQnx6ALHOqVyLujgS38VnocEFjyJXjmLGswVLL25jEPsDmsRHj6Iq3+Y/YoWO6jU3GjEECgYASH7MwKEevxbbPCnC3v+WcGkmJIx4o154sliCzVrVEpMBomPfdx/x1cQSDqLOUNvNjgBEvPBtOncMAvs96iU04wpXl3L0fjH9H3e1LEEeH0j+YCt802Tht0f7SKOorANU64dYGiizvs9tGx13WBfXgSOHHO/+eOELOnLMUc3Ix2g==\n-----END RSA PRIVATE KEY-----\n',
    '-----BEGIN RSA PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCV6v2R+HFQuidg\nKpU3S+Aw1cksqLUXMqWm9Sx432Ro2lB5STjIZSKQxXGP94dKclHFs5qgM/+yD+QC\nEI+KxYVRKaHG/mVQJmjXsrcjKthUujGNOeR0G6a6KpPMBBRaFUTm0zw2lSjtAuhC\ngCAi9uPfAoRW2esOi3qpAQCwq5+uIALkHd74IfUjLnLtJTIKl8PGAQbgc2+uXm0K\n7fOUZqRKhxYLzCdYY05VtAPsNfBBvDRc2J+TSyW/JK3Qwl0b+oCbURlXOnNNWK0I\n6PF1nsjXLQVOJt6EFkVUmO9rvFiWyQJLNwO/KrvMK/csfkEInGNpNuBSFI1S8oel\n6mtCZGVNAgMBAAECggEAb66NlA6Wq+LhrnxKiNUXgIniwkg0D8IFMal3pdwVex8X\n0CLCEFd3No5AGVX3DXi4fiVcTXgvRcEcxIT9yg13UY1IHWwqoVjbxcQ3NhWW7xd+\nDo1QKUboH8vUKqnnV2x81dALDUZ1JIuD5vZ3+lQeUWYYnHLe7wjtKbW7g+F2pUnC\nW04xRdhMrjavLP85Kqvaqy9iGuFtDNGjfYh8jVv2EpGkNfcMsy8d8pCz6GXojRY3\nJpwCsVxLSInYxm4zds5Oaj/6uTSLs6vpSwtJZxQJP1QfRF3kS6MczvfUPvRVNfiA\nG3OYAxFrk3dXRwB9Ej0Yz+m4E4qMiLRE1kTGri3NAQKBgQDX2u850KJko6VqNLm+\n8BDDq8B+MzG+Y0YaJsSstcp3pZwF2ZwAGjMOcXzLTcn4q+iQi63DfmQhfnwbQMqk\nHg7QcYkX83VlSvRzxNcsgUsEU9XuMoWH57E6O0vsdo4R3zpInvpXLkwcG6o2ztB0\nO6XLjBV/CInU/36nnPR9ZaSZLQKBgQCxzLipmcHZugvHljrR+GL1tFPy/k2d4WcU\nggtV9haCVNHGW84AUvw8/PuW1DX+47h/hFfv0lX0vOHosPciymt6LD5g4PqQxYQc\nHgedktJC0p2Esf+SW7apdAga5/bJyxtgpfTx/1KOFmeqimBEx4phzuAr5BYtQBQs\nKGnWe0pQoQKBgFx4CqFe0iKAxDzyJ1w3ZUcdjZHChp3D02UilIBURE7rICKVbTHS\nB2s5jLdfNJWVt0QswhyMSYLbt3jJUcXqpnf/GzaqcfEZogzyFyeWn7dT3sJy3Ccz\nRwXmHwlGZGgdk89GY4HzcGFeLJXcFQql/slq0k6gLsOTTAOrxkTtxQxlAoGADup3\ny3KkuplLB7Foudi2pJo+OLJw3H/eX/AQ92MvvDtVZeipvYk4s/0dNigTZ5C/F6OI\npQvmPiPiZ90AvqBwp80yZno5Sw/m51z1kpiQnx6ALHOqVyLujgS38VnocEFjyJXj\nmLGswVLL25jEPsDmsRHj6Iq3+Y/YoWO6jU3GjEECgYASH7MwKEevxbbPCnC3v+Wc\nGkmJIx4o154sliCzVrVEpMBomPfdx/x1cQSDqLOUNvNjgBEvPBtOncMAvs96iU04\nwpXl3L0fjH9H3e1LEEeH0j+YCt802Tht0f7SKOorANU64dYGiizvs9tGx13WBfXg\nSOHHO/+eOELOnLMUc3Ix2g==\n-----END RSA PRIVATE KEY-----\n',
    // Contents of private_key.pem if you want to load the pem file yourself
    // (do not use the path parameter above if using this param)
    'ea537513aef71d7f8ffc215ef35ea0b9267a6e48',
    // Scopes can be specified either as an array or as a single, space-delimited string
    ['https://www.googleapis.com/auth/drive.readonly'],
    // User to impersonate (leave empty if no impersonation needed)
    'subject-account-email@example.com');

authClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Make an authorized request to list Drive files.
  drive.files.list({ auth: authClient }, function(err, resp) {
    // handle err and response
  });
});
