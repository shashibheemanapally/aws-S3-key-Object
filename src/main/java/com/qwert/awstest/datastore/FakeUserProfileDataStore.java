package com.qwert.awstest.datastore;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.qwert.awstest.profile.UserProfile;

@Repository
public class FakeUserProfileDataStore {

	private static final List<UserProfile> USER_PROFILES= new ArrayList<>();
	
	static {
		USER_PROFILES.add(new UserProfile(UUID.fromString("0fc1a51f-7921-4dcd-8a4e-12995fee0ee7"), "janet", null));
		USER_PROFILES.add(new UserProfile(UUID.fromString("dbbe9f56-ecbc-4e63-8ae6-8fd5d647a3a7"), "antonio", null));
	}
	
	public List<UserProfile> getUserProfiles(){
		return USER_PROFILES;
	}
}
