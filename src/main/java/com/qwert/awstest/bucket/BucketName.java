package com.qwert.awstest.bucket;

public enum BucketName {
	PROFILE_IMAGE("profile-image-store-stockbasket");
	
	private final String bucketName;

	private BucketName(String bucketName) {
		this.bucketName = bucketName;
	}

	public String getBucketName() {
		return bucketName;
	}
	
}
