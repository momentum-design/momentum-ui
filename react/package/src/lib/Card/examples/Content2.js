import React from 'react';
import { Card, CardSection } from '@momentum-ui/react';
export default function CardContent2() {
	return (
		<Card className="small-3 columns">
			<CardSection full>
				<img alt="placeholder" src="https://place-hold.it/400x400" />
			</CardSection>
			<CardSection>
				Product Announcement
			</CardSection>
			<CardSection>
				QWASI Makes Marketing Loyalty Programs Better with Collaboration
			</CardSection>
			<CardSection style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
				<h4>Clickable</h4>
				<h6>Subtitle</h6>
			</CardSection>
		</Card>
	);
}
