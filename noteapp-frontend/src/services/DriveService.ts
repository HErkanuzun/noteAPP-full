import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

class DriveService {
  private static instance: DriveService;
  private auth: any;

  private constructor() {
    this.auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY,
      scopes: SCOPES,
    });
  }

  public static getInstance(): DriveService {
    if (!DriveService.instance) {
      DriveService.instance = new DriveService();
    }
    return DriveService.instance;
  }

  async getFileContent(fileId: string): Promise<string> {
    try {
      const drive = google.drive({ version: 'v3', auth: this.auth });
      
      // Get file metadata
      const file = await drive.files.get({
        fileId,
        fields: 'mimeType',
      });

      // Get file content
      const response = await drive.files.get({
        fileId,
        alt: 'media',
      }, {
        responseType: 'stream'
      });

      // Convert stream to string
      const chunks: Buffer[] = [];
      return new Promise((resolve, reject) => {
        response.data
          .on('data', (chunk: Buffer) => chunks.push(chunk))
          .on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
          .on('error', reject);
      });
    } catch (error) {
      console.error('Error fetching file from Drive:', error);
      throw new Error('Failed to fetch file from Google Drive');
    }
  }

  async getFileMetadata(fileId: string) {
    try {
      const drive = google.drive({ version: 'v3', auth: this.auth });
      const response = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size, createdTime, modifiedTime',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      throw new Error('Failed to fetch file metadata from Google Drive');
    }
  }
}

export default DriveService;