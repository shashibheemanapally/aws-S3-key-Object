package com.qwert.awstest.bucket;

public enum BucketName {
	PROFILE_IMAGE("image-upload-test-qwert");
	
	private final String bucketName;

	private BucketName(String bucketName) {
		this.bucketName = bucketName;
	}

	public String getBucketName() {
		return bucketName;
	}
	
}
