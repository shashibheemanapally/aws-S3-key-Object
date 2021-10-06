package com.qwert.awstest.profile;

import java.io.IOException;
import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import static org.apache.http.entity.ContentType.*;

import com.qwert.awstest.bucket.BucketName;
import com.qwert.awstest.filestore.FileStore;


@Service
public class UserProfileService {
	
	
	private final FileStore fileStore;
	
	@Autowired
	public UserProfileService(FileStore fileStore) {
		super();
		
		this.fileStore = fileStore;
	}
	
	

	

	public void uploadUserProfileImage(String userProfileId, MultipartFile file) {
		// 1. Check if image is not empty
        isFileEmpty(file);
        // 2. If file is an image
        isImage(file);

        // 3. The user exists in our database
       // UserProfile user = getUserProfileOrThrow(userProfileId);

        // 4. Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        // 5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), userProfileId);
        String filename = String.format("%s_profile_picture", userProfileId);

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
           
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
		
	}
	
	 private Map<String, String> extractMetadata(MultipartFile file) {
	        Map<String, String> metadata = new HashMap<>();
	        metadata.put("Content-Type", file.getContentType());
	        metadata.put("Content-Length", String.valueOf(file.getSize()));
	        return metadata;
	    }

	    

	    private void isImage(MultipartFile file) {
	        if (!Arrays.asList(
	                IMAGE_JPEG.getMimeType(),
	                IMAGE_PNG.getMimeType(),
	                IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
	            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
	        }
	    }

	    private void isFileEmpty(MultipartFile file) {
	        if (file.isEmpty()) {
	            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
	        }
	    }

		public byte[] downloadUserProfileImage(String userProfileId) {
			 

		        String path = String.format("%s/%s",
		                BucketName.PROFILE_IMAGE.getBucketName(),
		                userProfileId);

		        return fileStore.download(path, String.format("%s_profile_picture", userProfileId));
		                
		}
}
