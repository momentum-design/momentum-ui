import React from 'react';
import { Card, CardSection } from '@momentum-ui/react';

export default function CardDefault() {
	return (
		<Card className="small-3 columns">
			<CardSection>
				<h4>Title</h4>
				<h6>Subtitle</h6>
			</CardSection>
			<CardSection full>
				<img alt="placeholder" src="https://place-hold.it/500x300" />
			</CardSection>
			<CardSection>Content</CardSection>
			<CardSection>FOOTER</CardSection>
		</Card>
	);
}
