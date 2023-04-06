import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { name, bio, url, alt } = attributes;

	const onChangeName = ( newName ) => {
		setAttributes( { name: newName } );
	};

	const onChangeBio = ( newBio ) => {
		setAttributes( { bio: newBio } );
	};

	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
		}

		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

	return (
		<div { ...useBlockProps() }>
			{ url && (
				<div
					className={ `wp-block-blocks-course-team-member-img${
						isBlobURL( url ) ? ' is-loading' : ''
					}` }
				>
					<img src={ url } alt={ alt } />
					{ isBlobURL( url ) && <Spinner /> }
				</div>
			) }
			<MediaPlaceholder
				icon="admin-users"
				onSelect={ onSelectImage }
				// onSelectURL={ ( val ) => console.log( val ) }
				// onError={ ( err ) => console.log( err ) }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				disableMediaButtons={ url }
			/>
			<RichText
				placeholder={ __( 'Member Name', 'bc-team-members' ) }
				tagName="h4"
				onChange={ onChangeName }
				value={ name }
			/>
			<RichText
				placeholder={ __( 'Member Bio', 'bc-team-members' ) }
				tagName="p"
				onChange={ onChangeBio }
				value={ bio }
			/>
		</div>
	);
}
